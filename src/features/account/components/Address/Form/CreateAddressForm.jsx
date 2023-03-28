import {useEffect, useState} from 'react'
import {Formik, Form} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useProfileInfoQueryContext} from '@/features/account/stores/ProfileInfoQueryProvider'
import {createAddress} from '@/features/account/api'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import InputField from '@/components/elements/Input/InputField'
import CheckboxField from '@/components/elements/Input/CheckboxField'

import addressFormModel from '@/features/account/models/Address/addressFormModel'
import addressSchema from '@/features/account/models/Address/addressSchema'
import addressInitialValues from '@/features/account/models/Address/addressInitialValues'

const CreateAddressForm = () => {
  const swal = withReactContent(Swal)
  const {refetch} = useProfileInfoQueryContext()
  const {toggleModal} = useModalContext()
  const [initialAddress, setInitialAddress] = useState(addressInitialValues)

  const {
    formId,
    formField: {label, address1, address2, city, zip, province, country, isDefault},
  } = addressFormModel

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    console.log(values)
    swal
      .fire({
        title: 'Create New Address?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await createAddress(values)
            swal.fire('New Address Created!', response.detail, 'success')
            console.log()
          } catch (ex) {
            toast.error(ex.detail)
          } finally {
            actions.setSubmitting(true)
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        cancel(true)
      })
  }

  return (
    <div className='d-flex flex-wrap align-items-center'>
      <div className='flex-row-fluid'>
        <Formik
          enableReinitialize
          validationSchema={addressSchema}
          initialValues={initialAddress}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form p-5' id={formId}>
              <div className='mb-5 row'>
                <div className='col'>
                  <InputField className='form-control' name={label.name} label={label.label} />
                </div>
              </div>
              <div className='mb-5 row'>
                <div className='col'>
                  <InputField
                    className='form-control'
                    name={address1.name}
                    label={address1.label}
                    required
                  />
                </div>
              </div>
              <div className='mb-5 row'>
                <div className='col'>
                  <InputField
                    className='form-control'
                    name={address2.name}
                    label={address2.label}
                    required
                  />
                </div>
              </div>
              <div className='mb-5 row'>
                <div className='col'>
                  <InputField className='form-control' name={city.name} label={city.label} />
                </div>
                <div className='col'>
                  <InputField className='form-control' name={zip.name} label={zip.label} required />
                </div>
              </div>
              <div className='mb-5 row'>
                <div className='col'>
                  <InputField
                    className='form-control'
                    name={province.name}
                    label={province.label}
                    required
                  />
                </div>
                <div className='col'>
                  <InputField
                    className='form-control'
                    name={country.name}
                    label={country.label}
                    required
                  />
                </div>
              </div>
              <div className='row'>
                <div className='col-6'>
                  <div className='mb-7'>
                    <label className='d-flex align-items-center fs-6 fw-semibold form-label mb-2'>
                      <span>Set address to default?</span>
                    </label>
                    <label className='form-check form-switch form-check-custom form-check-solid'>
                      <CheckboxField name={isDefault.name} label={isDefault.label} required />
                    </label>
                  </div>
                </div>
              </div>
              <div className='text-center pt-10'>
                <button type='button' className='btn btn-light px-6 me-3' onClick={cancel}>
                  Cancel
                </button>
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

export default CreateAddressForm
