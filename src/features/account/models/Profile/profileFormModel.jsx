export default {
  formId: 'profileForm',
  formField: {
    avatarInfo: {
      fileName: {
        key: 'fileName',
        name: 'avatarInfo.fileName',
      },
      avatar: {
        key: 'avatar',
        name: 'avatarInfo.avatar',
      },
    },
    personalInfo: {
      birthdate: {
        key: 'birthdate',
        name: 'personalInfo.birthdate',
        label: 'Birthdate',
        requiredErrorMsg: 'Birthdate is required',
      },
      gender: {
        key: 'gender',
        name: 'personalInfo.gender',
        label: 'Gender',
        requiredErrorMsg: 'Gender is required',
      },
    },
    contactInfo: {
      contactNumber: {
        key: 'contactNumber',
        name: 'contactInfo.contactNumber',
        label: 'Contact Number',
        requiredErrorMsg: 'Contact Number is required',
      },
    },
  },
}
