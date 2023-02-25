import clsx from 'clsx'
import Select from 'react-select'

export default function SelectInputFieldNonFormik(props) {
  const {label, data, className, setValue, ...rest} = props

  const handleChange = (e) => {
    setValue(e.value)
  }

  return (
    <>
      {label && <label className={clsx('form-label mb-3')}>{label}</label>}
      <Select
        onChange={(e) => handleChange(e)}
        options={data}
        classNames={{
          singleValue: (state) => 'react-select-value',
          input: (state) => 'react-select-value',
          control: (state) => 'react-select form-control',
          indicatorSeparator: (state) => 'd-none',
          menu: (state) => 'react-select-options',
          option: (state) =>
            state.isFocused ? 'react-select-option focused' : 'react-select-option',
        }}
      />
    </>
  )
}
