import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useNavigate} from 'react-router-dom'
import {useEffect, useRef, useState} from 'react'
import {Formik, Form} from 'formik'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {toast} from 'react-toastify'
import InputField from '@/components/elements/Input/InputField'
import PasswordField from '@/components/elements/Input/PasswordField'
import {useRegistrationContext} from '../stores/RegistrationProvider'
import {registerAccount} from '../api'
import registrationFormModel from '../models/Registration/registrationFormModel'
import registrationInitialValues from '../models/Registration/registrationInitialValues'
import registrationSchema from '../models/Registration/registrationSchema'

const RegistrationForm = () => {
  const intl = useIntl()
  const navigate = useNavigate()
  const swal = withReactContent(Swal)
  const [initialRegistration, setInitialRegistration] = useState(registrationInitialValues)
  const {verified, data} = useRegistrationContext()

  const {
    formId,
    formField: {
      firstName,
      lastName,
      user: {username, emailAddress, password, repeatPassword},
    },
  } = registrationFormModel

  useEffect(() => {
    if (data) {
      setInitialRegistration((prevState) => {
        return {...prevState, data: data}
      })
    }
  }, [data])

  const submit = async (values, actions) => {
    actions.setSubmitting(true)
    try {
      registerAccount(values).then((response) => {
        swal.fire('Registration Successful!', response.data.detail, 'success')
        toast.success(response.data.detail)
      })
    } catch (ex) {
      swal.fire('Invalid Link!', ex.detail, 'error')
      toast.error(ex.detail)
    } finally {
      actions.setSubmitting(true)
      navigate('/')
    }
  }

  return (
    <div className='d-flex flex-center flex-column-fluid pb-15 pb-lg-20'>
      {verified && (
        <Formik
          enableReinitialize
          validateOnChange={false}
          validationSchema={registrationSchema}
          initialValues={initialRegistration}
          onSubmit={submit}
        >
          {(actions) => (
            <Form className='form w-100' id={formId}>
              <div className='text-center mb-11'>
                <h1 className='text-dark fw-bolder mb-3'>
                  {intl.formatMessage({id: 'REGISTRATION.HEADER'})}
                </h1>
              </div>
              <div className='row mb-7'>
                <div className='col-6'>
                  <InputField
                    className='form-control'
                    name={firstName.name}
                    placeholder={firstName.label}
                  />
                </div>
                <div className='col-6'>
                  <InputField
                    className='form-control'
                    name={lastName.name}
                    placeholder={lastName.label}
                  />
                </div>
              </div>
              <div className='mb-7'>
                <InputField
                  className='form-control'
                  name={username.name}
                  placeholder={username.label}
                />
              </div>
              <div className='mb-7'>
                <InputField
                  className='form-control'
                  name={emailAddress.name}
                  placeholder={emailAddress.label}
                  required
                />
              </div>
              <div className='mb-7'>
                <PasswordField
                  className='form-control'
                  name={password.name}
                  placeholder={password.label}
                  helperText={password.helperText}
                />
              </div>
              <div className='mb-7'>
                <PasswordField
                  className='form-control'
                  name={repeatPassword.name}
                  placeholder={repeatPassword.label}
                />
              </div>
              <div className='fv-row mb-10'></div>
              <div className='d-grid mb-10'>
                <button
                  type='submit'
                  className='btn btn-lg btn-primary'
                  disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
                >
                  {!actions.isSubmitting && <span className='indicator-label'>Register</span>}
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
      )}
    </div>
  )
}

export default RegistrationForm
