import {useField} from 'formik'
import clsx from 'clsx'

export default function TextAreaField(props) {
  const {label, required, helperText, errorText, ...rest} = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <textarea
        rows='3'
        className={clsx('form-control form-control-solid', {
          'is-invalid': isError,
          'is-valid': isValid,
        })}
        {...field}
        {...rest}
      />
      {helperText && <div className='text-muted fs-7'>{helperText}</div>}
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}
