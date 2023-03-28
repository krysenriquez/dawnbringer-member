import {useField, useFormikContext} from 'formik'
import clsx from 'clsx'
import {useEffect} from 'react'

export default function InputGroupDependentField(props) {
  const {setFieldValue} = useFormikContext()
  const {
    label,
    required,
    helperText,
    errorText,
    labelPrepend,
    labelAppend,
    groupClassName,
    className,
    fetch,
    dependency,
    ...rest
  } = props
  const [field, meta] = useField(props)
  const {touched, error, value} = meta
  const isError = touched && error && true
  const isValid = touched && !!!error && value

  const [dependencyField, dependencyMeta] = useField(dependency)

  useEffect(() => {
    const response = fetch(dependencyField.value)
    setFieldValue(props.name, response)
  }, [dependencyField.value])

  function renderErrorMessage() {
    if (isError) {
      return error
    }
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3', {required: required})}>{label}</label>}
      <div className={clsx('input-group', groupClassName && groupClassName)}>
        {labelPrepend ? <span className='input-group-text'>{labelPrepend}</span> : <></>}
        <input
          type='text'
          className={clsx(
            {
              'is-invalid': isError,
              'is-valid': isValid,
            },
            className && className
          )}
          {...field}
          {...rest}
        />
        {labelAppend ? <span className='input-group-text'>{labelAppend}</span> : <></>}
      </div>
      {helperText && <div className='text-muted fs-7'>{helperText}</div>}
      <div className='fv-plugins-message-container'>
        <div className='fv-help-block'>
          <span role='alert'>{renderErrorMessage()}</span>
        </div>
      </div>
    </>
  )
}
