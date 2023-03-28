import profileFormModel from './profileFormModel'
const {
  formField: {
    personalInfo: {birthdate, gender},
    contactInfo: {contactNumber},
    avatarInfo: {fileName, avatar},
  },
} = profileFormModel

export default {
  personalInfo: {
    [birthdate.key]: new Date(),
    [gender.key]: '',
  },
  contactInfo: {
    [contactNumber.key]: '',
  },
  avatarInfo: {
    [avatar.key]: '',
  },
}
