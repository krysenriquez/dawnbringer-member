import {useEffect, useState, useRef} from 'react'
import {Formik, Form, FieldArray} from 'formik'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {createPointConversion} from '../../api'
import {
  usePointsQueryData,
  usePointsQueryLoading,
  usePointsQueryContext,
} from '@/features/points/stores/PointsQueryProvider'
import {useAccount} from '@/providers/AccountProvider'
import {usePointConversion} from '@/features/points/stores/PointConversionProvider'
import InputField from '@/components/elements/Input/InputField'
import InputGroupField from '@/components/elements/Input/InputGroupField'
import processPointConversionFormModel from '../../models/ActivityConversion/processPointConversionFormModel'
import processPointConversionInitialValues from '../../models/ActivityConversion/processPointInitialValues'
import processPointConversionSchema from '../../models/ActivityConversion/processPointConversionSchema'

const PointConversionForm = () => {
  const {toggleModal} = useModalContext()
  const swal = withReactContent(Swal)
  const points = usePointsQueryData()
  const isLoading = usePointsQueryLoading()
  const {refetch} = usePointsQueryContext()
  const {currentAccount} = useAccount()
  const {conversionRate, membershipLevels} = usePointConversion()
  const formikActionsRef = useRef(null)

  const [initialConversion, setInitialConversion] = useState(processPointConversionInitialValues)
  const {
    formId,
    formField: {
      activities: [{activityAmount, currentPoints, membershipLevel}],
    },
  } = processPointConversionFormModel

  useEffect(() => {
    if (membershipLevels && points && !isLoading) {
      let activities = []
      membershipLevels.map((level) => {
        let membershipLevelPoint = points.membershipLevelPoints.find((point) => {
          return point.name == level.name
        })
        return activities.push({
          membershipLevelLabel: level.name,
          membershipLevel: level.level,
          currentPoints: membershipLevelPoint.total,
          activityAmount: membershipLevelPoint.total * conversionRate,
        })
      })
      setInitialConversion((prevState) => {
        return {...prevState, activities: activities, accountId: currentAccount.accountId}
      })
    }
  }, [membershipLevels, points])

  const computeField = (e, index) => {
    formikActionsRef.current.setFieldValue(`activities[${index}].currentPoints`, e.target.value)
    let convertedAmount = parseFloat(e.target.value) * parseFloat(conversionRate)
    formikActionsRef.current.setFieldValue(`activities[${index}].activityAmount`, convertedAmount)
  }

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submit = async (values, actions) => {
    console.log(formikActionsRef.current.values)
    console.log(values)
    swal
      .fire({
        title: 'Convert Points?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Convert',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await createPointConversion(values)
            swal.fire('Points Converted', response.detail, 'success')
            toast.success(response.detail)
          } catch (ex) {
            toast.error(ex.response.data.detail)
          } finally {
            actions.resetForm()
          }
        }
      })
      .finally(() => {
        actions.setSubmitting(false)
        cancel(true)
      })
  }

  return (
    <Formik
      enableReinitialize={true}
      validateOnChange={false}
      validationSchema={processPointConversionSchema}
      initialValues={initialConversion}
      onSubmit={submit}
    >
      {(actions) => {
        formikActionsRef.current = actions
        return (
          <Form id={formId} className='form'>
            <div className='d-flex flex-column scroll-y me-n7 pe-4'>
              <table className='table align-middle table-row-dashed fs-6 gy-5'>
                <thead>
                  <tr>
                    <th>Membership Points</th>
                    <th>Current Points</th>
                    <th>Converted Points</th>
                  </tr>
                </thead>
                <FieldArray
                  name='activities'
                  render={(arrayHelpers) => (
                    <tbody className='text-gray-600 fw-semibold'>
                      {actions.values.activities &&
                        actions.values.activities.map((level, index) => {
                          return (
                            <tr key={level.membershipLevelLabel}>
                              <td className='text-gray-800'>{level.membershipLevelLabel}</td>
                              <td>
                                <InputField
                                  className='form-control'
                                  name={`activities[${index}][${currentPoints.name}]`}
                                  placeholder={level.membershipLevelLabel + ' Current Points'}
                                  onChange={(e) => computeField(e, index)}
                                  required
                                />
                              </td>
                              <td>
                                <InputGroupField
                                  className='form-control'
                                  name={`activities[${index}][${activityAmount.name}]`}
                                  placeholder={level.membershipLevelLabel + ' Converted Points'}
                                  labelPrepend='₱'
                                  disabled
                                />
                              </td>
                            </tr>
                          )
                        })}
                    </tbody>
                  )}
                />
              </table>
            </div>
            <div className='text-center pt-15'>
              <button
                type='reset'
                onClick={() => cancel()}
                className='btn btn-light me-3'
                disabled={actions.isSubmitting}
              >
                Cancel
              </button>
              <button
                type='submit'
                className='btn btn-primary'
                disabled={actions.isSubmitting || !actions.isValid || !actions.touched}
              >
                <span className='indicator-label'>Submit</span>
                {actions.isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PointConversionForm
