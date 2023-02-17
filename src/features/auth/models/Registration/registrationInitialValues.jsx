import registrationFormModel from './registrationFormModel'
const {
  formField: {
    firstName,
    middleName,
    lastName,
    personalInfo: {birthdate, gender},
    contactInfo: {contactNumber},
    addressInfo: {address1, address2, city, zip, province, country},
    user: {username, emailAddress, password, repeatPassword},
  },
} = registrationFormModel

export default {
  [firstName.key]: '',
  [middleName.key]: '',
  [lastName.key]: '',
  personalInfo: {},
  contactInfo: {},
  addressInfo: {},
  avatarInfo: {},
  user: {
    [username.key]: '',
    [emailAddress.key]: '',
    [password.key]: '',
    [repeatPassword.key]: '',
  },
}
