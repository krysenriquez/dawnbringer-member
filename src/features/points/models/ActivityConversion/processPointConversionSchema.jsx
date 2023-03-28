import {string, object, array, number} from 'yup'
import processPointConversionFormModel from './processPointConversionFormModel'
const {
  formField: {
    activities: [{membershipLevel, currentPoints, activityAmount}],
  },
} = processPointConversionFormModel
import {getMaxConversionAmount} from '../../api'

const validateMaxConversionAmount = async (ctx) => {
  if (ctx.parent.currentPoints > 0) {
    return await getMaxConversionAmount({
      membershipLevel: ctx.parent.membershipLevel,
      amount: ctx.parent.currentPoints,
    })
      .then(async (response) => {
        return true
      })
      .catch((err) => {
        return ctx.createError({path: ctx.path, message: err.response.data.detail})
      })
  }
  return true
}

export default object().shape({
  activities: array().of(
    object({
      [membershipLevel.key]: string().required(`${membershipLevel.requiredErrorMsg}`),
      [currentPoints.key]: number()
        .min(0)
        .integer(`${currentPoints.invalidErrorMsg}`)
        .required(`${currentPoints.requiredErrorMsg}`)
        .test({
          name: 'is-valid-conversion-amount',
          test: (value, ctx) => validateMaxConversionAmount(ctx),
          exclusive: true,
        }),
      [activityAmount.key]: number()
        .min(0)
        .integer(`${activityAmount.invalidErrorMsg}`)
        .required(`${activityAmount.requiredErrorMsg}`),
    })
  ),
})
