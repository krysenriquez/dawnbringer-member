import {string, object, array, date, boolean} from 'yup'

import profileFormModel from './addressFormModel'
const {
  formField: {label, address1, address2, city, zip, province, country, isDefault},
} = profileFormModel

export default object().shape({
  [label.key]: string().nullable(),
  [address1.key]: string().nullable(),
  [address2.key]: string().nullable(),
  [city.key]: string().nullable(),
  [zip.key]: string().nullable(),
  [province.key]: string().nullable(),
  [country.key]: string().nullable(),
  [isDefault.key]: boolean(),
})
