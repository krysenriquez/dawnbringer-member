import cashoutFormModel from './cashoutFormModel'
const {
  formField: {
    activityAmount,
    activityAdminFee,
    activityTotalAmount,
    wallet,
    note,
    cashoutMethod: {cashoutMethodId, accountName, accountNumber, method, others},
  },
} = cashoutFormModel

export default {
  [activityAmount.key]: 0,
  [activityAdminFee.key]: 0,
  [activityTotalAmount.key]: 0,
  [wallet.key]: 'M_WALLET',
  [note.key]: '',
  cashoutMethod: {
    [cashoutMethodId.key]: '',
    [accountName.key]: '',
    [accountNumber.key]: '',
    [method.key]: '',
    [others.key]: '',
  },
}
