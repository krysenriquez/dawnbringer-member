export default {
  formId: 'registrationForm',
  formField: {
    firstName: {
      key: 'firstName',
      name: 'firstName',
      label: 'First Name',
      requiredErrorMsg: 'First name is required',
    },
    middleName: {
      key: 'middleName',
      name: 'middleName',
      label: 'Middle Name',
      requiredErrorMsg: 'Middle name is required',
    },
    lastName: {
      key: 'lastName',
      name: 'lastName',
      label: 'Last Name',
      requiredErrorMsg: 'Last name is required',
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
    addressInfo: {
      address1: {
        key: 'address1',
        name: 'addressInfo.address1',
        label: 'Address 1',
        requiredErrorMsg: 'Address 1',
      },
      address2: {
        key: 'address2',
        name: 'addressInfo.address2',
        label: 'address2',
        requiredErrorMsg: 'Address 2',
      },
      city: {
        key: 'city',
        name: 'addressInfo.city',
        label: 'City',
        requiredErrorMsg: 'City',
      },
      zip: {
        key: 'zip',
        name: 'addressInfo.zip',
        label: 'Zip',
        requiredErrorMsg: 'Zip',
      },
      province: {
        key: 'province',
        name: 'addressInfo.province',
        label: 'Province',
        requiredErrorMsg: 'Province',
      },
      country: {
        key: 'country',
        name: 'addressInfo.country',
        label: 'Country',
        requiredErrorMsg: 'Country',
      },
    },
    user: {
      username: {
        key: 'username',
        name: 'user.username',
        label: 'Username',
        min: 8,
        max: 20,
        requiredErrorMsg: 'Username is required',
      },
      emailAddress: {
        key: 'emailAddress',
        name: 'user.emailAddress',
        label: 'Email Address',
        requiredErrorMsg: 'Email Address is required',
        invalidErrorMsg: 'Invalid Email format',
      },
      password: {
        key: 'password',
        name: 'user.password',
        label: 'Password',
        requiredErrorMsg: 'Password is required',
      },
      repeatPassword: {
        key: 'repeatPassword',
        name: 'user.repeatPassword',
        label: 'Repeat Password',
        requiredErrorMsg: 'Repeat Password is required',
        invalidErrorMsg: 'Passwords must match',
      },
    },
  },
}
