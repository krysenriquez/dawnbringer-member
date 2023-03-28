import {useEffect, useState} from 'react'
import humps, {decamelizeKeys} from 'humps'
import {Formik, Form, FieldArray} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useStateProviderContext} from '@/providers/StateProvider'
import {
  useProfileInfoQueryData,
  useProfileInfoQueryLoading,
  useProfileInfoQueryContext,
} from '../../../stores/ProfileInfoQueryProvider'
import {updateAccountProfile} from '@/features/account/api'
import InputField from '@/components/elements/Input/InputField'
import DatePickerField from '@/components/elements/Input/DatePickerField'
import SelectField from '@/components/elements/Input/SelectField'
import ImageInputField from '@/components/elements/Input/ImageInputField'

import profileFormModel from '@/features/account/models/Profile/profileFormModel'
import profileSchema from '@/features/account/models/Profile/profileSchema'
import profileInitialValues from '@/features/account/models/Profile/profileInitialValues'

const genders = [
  {
    value: null,
    label: 'Select Gender',
  },
  {
    value: 'MALE',
    label: 'Male',
  },
  {
    value: 'FEMALE',
    label: 'Female',
  },
]

const ProfileForm = () => {
  const swal = withReactContent(Swal)
  const profile = useProfileInfoQueryData()
  const isLoading = useProfileInfoQueryLoading()
  const {refetch} = useProfileInfoQueryContext()
  const [initialProfile, setInitialProfile] = useState(profileInitialValues)

  const {
    formId,
    formField: {
      avatarInfo: {avatar},
      personalInfo: {birthdate, gender},
      contactInfo: {contactNumber},
    },
  } = profileFormModel

  useEffect(() => {
    if (profile && !isLoading) {
      if (profile.personalInfo) {
        setInitialProfile((prevState) => {
          return {
            ...prevState,
            personalInfo: {
              gender: profile.personalInfo.gender,
              birthdate: new Date(profile.personalInfo.birthdate),
              id: profile.personalInfo.id,
            },
          }
        })
      }
      if (profile.contactInfo) {
        setInitialProfile((prevState) => {
          return {
            ...prevState,
            contactInfo: {...profile.contactInfo},
          }
        })
      }
      if (profile.avatarInfo) {
        setInitialProfile((prevState) => {
          return {
            ...prevState,
            avatarInfo: {
              avatar: profile.avatarInfo.avatar ? profile.avatarInfo.avatar : '',
              id: profile.avatarInfo.id,
            },
          }
        })
      }
    }
  }, [profile, isLoading])

  const submit = async (values, actions) => {
    const formData = transformToFormData(values)
    swal
      .fire({
        title: 'Update Profile?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Update',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await updateAccountProfile(formData)
            swal.fire('Profile Updated!', response.detail, 'success')
          } catch (ex) {
            toast.error(ex.detail)
          } finally {
            actions.setSubmitting(true)
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        refetch()
      })
  }

  const transformToFormData = (values) => {
    const formData = new FormData()
    const avatar = values.avatarInfo
    const decamelizedValues = humps.decamelizeKeys(values)

    for (var keys in decamelizedValues) {
      if (keys != 'avatar_info') {
        formData.append(keys, JSON.stringify(decamelizedValues[keys]))
      }
    }

    if (avatar.avatar instanceof File) {
      for (var keys in avatar) {
        formData.append(`avatar_info['${keys}']`, avatar[keys])
      }
    }

    return formData
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div className='card-header border-0' role='button'>
        <div className='card-title m-0'>
          <h3 className='fw-bold m-0'>Profile Details</h3>
        </div>
      </div>
      <div>
        <Formik
          enableReinitialize
          validationSchema={profileSchema}
          initialValues={initialProfile}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form' id={formId}>
              <div className='card-body border-top p-9'>
                <div className='row'>
                  <div className='col-12'>
                    <label className='form-label mb-3'>
                      <span>Avatar</span>
                    </label>
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-12'>
                    <ImageInputField name={avatar.name} />
                  </div>
                </div>
                <div className='mb-5 row'>
                  <div className='col-12'>
                    <InputField
                      className='form-control'
                      name={contactNumber.name}
                      label={contactNumber.label}
                      required
                    />
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-lg-6'>
                    <DatePickerField
                      className='form-control'
                      name={birthdate.name}
                      label={birthdate.label}
                      required
                    />
                  </div>
                  <div className='col-lg-6'>
                    <SelectField
                      className='form-control'
                      name={gender.name}
                      label={gender.label}
                      data={genders}
                    />
                  </div>
                </div>
              </div>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={actions.isSubmitting || !actions.isValid}
                >
                  {!actions.isSubmitting && <span className='indicator-label'> Save Changes</span>}
                  {actions.isSubmitting && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Please wait...
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default ProfileForm
