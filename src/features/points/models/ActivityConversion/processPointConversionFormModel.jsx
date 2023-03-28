export default {
  formId: 'processPointConversionForm',
  formField: {
    activities: [
      {
        membershipLevel: {
          key: 'membershipLevel',
          name: 'membershipLevel',
          requiredErrorMsg: 'Membership Level is required',
        },
        currentPoints: {
          key: 'currentPoints',
          name: 'currentPoints',
          requiredErrorMsg: 'Current Points is required',
          invalidErrorMsg: 'Invalid Current Points format',
        },
        activityAmount: {
          key: 'activityAmount',
          name: 'activityAmount',
          requiredErrorMsg: 'Activity Amount is required',
          invalidErrorMsg: 'Invalid Activity Amount format',
        },
      },
    ],
  },
}
