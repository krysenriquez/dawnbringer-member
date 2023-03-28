import {string, object, array, date} from 'yup'

import profileFormModel from './profileFormModel'
const {
  formField: {
    personalInfo: {birthdate, gender},
    contactInfo: {contactNumber},
  },
} = profileFormModel

export default object().shape({
  personalInfo: object({
    [birthdate.key]: date(),
    [gender.key]: string().nullable(),
  }),
  contactInfo: object({
    [contactNumber.key]: string().nullable(),
  }),
})
