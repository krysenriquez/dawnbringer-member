import profileFormModel from './addressFormModel'
const {
  formField: {label, address1, address2, city, zip, province, country, isDefault},
} = profileFormModel

export default {
  [label.key]: '',
  [address1.key]: '',
  [address2.key]: '',
  [city.key]: '',
  [zip.key]: '',
  [province.key]: '',
  [country.key]: '',
  [isDefault.key]: false,
}
