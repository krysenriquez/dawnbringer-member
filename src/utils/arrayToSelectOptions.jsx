export const arrayObjectToSelectOptions = (array, value, label, defaultLabel) => {
  let return_arr = [
    {
      value: '',
      label: defaultLabel,
    },
  ]
  array.map((arr) => {
    return_arr.push({
      value: arr[`${value}`],
      label: arr[`${label}`],
    })
  })

  return return_arr
}

export const arrayObjectToSelectOptionsWithGroup = (array, value, label, group, defaultLabel) => {
  let return_arr = []
  const grouped_arr = array.reduce((newArr, arr) => {
    const grouping = arr[`${group}`]
    newArr[grouping] = newArr[grouping] ?? []
    newArr[grouping].push({
      value: arr[`${value}`],
      label: arr[`${label}`],
    })
    return newArr
  }, {})

  for (const key in grouped_arr) {
    return_arr.push({
      label: key,
      options: grouped_arr[key],
    })
  }

  return return_arr
}

export const arrayToSelectOptions = (array, defaultLabel) => {
  let return_arr = [
    {
      value: '',
      label: defaultLabel,
    },
  ]

  array.map((arr) => {
    return_arr.push({value: arr, label: arr})
  })

  return return_arr
}

export const arrayObjectToSelectOptionsWithDisable = (
  array,
  value,
  label,
  defaultLabel,
  disabledField
) => {
  let return_arr = [
    {
      value: '',
      label: defaultLabel,
    },
  ]
  array.map((arr) => {
    return return_arr.push({
      value: arr[`${value}`],
      label: arr[`${disabledField}`] ? arr[`${label}`] + ' (Disabled)' : arr[`${label}`],
      disabled: arr[`${disabledField}`],
    })
  })

  return return_arr
}
