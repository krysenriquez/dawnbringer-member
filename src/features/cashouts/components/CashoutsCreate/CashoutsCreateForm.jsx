import {useEffect, useMemo, useState, useCallback} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {toast} from 'react-toastify'
import {requestCashout} from '../../api'
import {useIntl} from 'react-intl'
import {useAccount} from '@/providers/AccountProvider'
import {useCashoutsListQueryContext} from '../../stores/CashoutsListQueryProvider'
import {useCashoutCreate} from '../../stores/CashoutCreateProvider'
import {useModalContext} from '@/components/elements/Modal/CustomModal'
import {
  arrayObjectToSelectOptions,
  arrayObjectToSelectOptionsWithDisable,
} from '@/utils/arrayToSelectOptions'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import InputField from '@/components/elements/Input/InputField'
import InputGroupField from '@/components/elements/Input/InputGroupField'
import InputGroupDependentField from '@/components/elements/Input/InputGroupDependentField'
import SelectField from '@/components/elements/Input/SelectField'
import TextAreaField from '@/components/elements/Input/TextAreaField'

import cashoutSchema from '../../models/cashoutSchema'
import cashoutFormModel from '../../models/cashoutFormModel'
import cashoutInitialValues from '../../models/cashoutInitialValues'

const cashoutWallets = [
  {
    value: null,
    label: 'Select Wallet',
  },
  {
    value: 'M_WALLET',
    label: 'Member Wallet',
  },
]

const CashoutsCreateForm = () => {
  const intl = useIntl()
  const {toggleModal} = useModalContext()
  const {refetch} = useCashoutsListQueryContext()
  const {currentAccount} = useAccount()
  const {cashoutMethods, accountCashoutMethods, cashoutTotalFee, cashoutSchedules} =
    useCashoutCreate()
  const [initialCashout, setInitialCashout] = useState(cashoutInitialValues)
  const [cashoutMethodsOptions, setCashoutMethodsOptions] = useState([])
  const [accountCashoutMethodsOptions, setAccountCashoutMethodsOptions] = useState([])
  const swal = withReactContent(Swal)

  const {
    formId,
    formField: {
      activityAmount,
      activityAdminFee,
      activityTotalAmount,
      wallet,
      note,
      cashoutMethod: {cashoutMethodId, accountName, accountNumber, method, others},
    },
  } = cashoutFormModel

  const computeTotalAmount = (props) => {
    let fee = cashoutTotalFee ? cashoutTotalFee : 100
    const totalActivityAmount = props * ((100 - fee) / 100)
    return totalActivityAmount
  }

  useEffect(() => {
    if (currentAccount) {
      setInitialCashout((prevState) => {
        return {...prevState, accountId: currentAccount.accountId}
      })
    }
  }, [currentAccount])

  useEffect(() => {
    if (cashoutTotalFee) {
      setInitialCashout((prevState) => {
        return {...prevState, activityAdminFee: cashoutTotalFee}
      })
    }
  }, [cashoutTotalFee])

  useEffect(() => {
    if (accountCashoutMethods) {
      setAccountCashoutMethodsOptions(
        arrayObjectToSelectOptionsWithDisable(
          accountCashoutMethods,
          'id',
          'cashoutMethodName',
          'Select Cashout Method',
          'disabled'
        )
      )
    }
  }, [accountCashoutMethods])

  useEffect(() => {
    if (cashoutMethods) {
      setCashoutMethodsOptions(
        arrayObjectToSelectOptions(cashoutMethods, 'id', 'methodName', 'Select Cashout Method')
      )
    }
  }, [cashoutMethods])

  const cancel = (withRefresh) => {
    if (withRefresh) {
      refetch()
    }
    toggleModal()
  }

  const submitForm = async (values, actions) => {
    console.log(values)
    swal
      .fire({
        title: 'Create Cashout?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-danger',
        confirmButtonText: 'Create',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          actions.setSubmitting(true)
          try {
            const {data: response} = await requestCashout(values)
            swal.fire('Cashout Created!', 'Cashout has been created.', 'success')
            toast.success(response.detail)
          } catch (ex) {
            toast.error(ex.detail)
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
    <>
      <div className='notice d-flex align-items-center bg-light-warning rounded border-warning border border-dashed mb-4 p-2'>
        <CustomSVG
          path='/media/icons/general/exclamation.svg'
          className='svg-icon svg-icon-1 svg-icon-primary me-2 ms-2'
        />
        <div className='d-flex flex-stack flex-grow-1'>
          <div className='fw-semibold lh-sm'>
            {cashoutSchedules ? (
              cashoutSchedules.map((schedule) => {
                return Object.keys(schedule).map((key) => {
                  return (
                    <div className='text-gray-700 fw-bold' key={key}>
                      {intl.formatMessage({id: key}) + ` ` + schedule[key]}
                    </div>
                  )
                })
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <Formik
        enableReinitialize={true}
        validationSchema={cashoutSchema}
        initialValues={initialCashout}
        onSubmit={submitForm}
      >
        {(actions) => (
          <Form id={formId}>
            <div className='d-flex flex-column scroll-y me-n7 pe-4'>
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <SelectField
                    className='form-select'
                    name={wallet.name}
                    label={wallet.label}
                    data={cashoutWallets}
                    disabled
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <InputGroupField
                    className='form-control'
                    name={activityAmount.name}
                    label={activityAmount.label}
                    labelPrepend='₱'
                  />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <InputGroupField
                    className='form-control'
                    name={activityAdminFee.name}
                    label={activityAdminFee.label}
                    labelAppend='%'
                    disabled
                  />
                  <div className='text-muted fs-7'>Admin Fee is required per Cashout</div>
                </div>
                <div className='col-md-6'>
                  <InputGroupDependentField
                    className='form-control'
                    name={activityTotalAmount.name}
                    label={activityTotalAmount.label}
                    fetch={computeTotalAmount}
                    dependency={activityAmount.name}
                    labelPrepend='₱'
                    disabled
                  />
                  <div className='text-muted fs-7'>Total Cashout Amount deducted by Admin Fee</div>
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-12'>
                  <TextAreaField name={note.name} label={note.label} className='form-control' />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-md-12'>
                  <SelectField
                    className='form-select'
                    name={cashoutMethodId.name}
                    label={cashoutMethodId.label}
                    data={accountCashoutMethodsOptions}
                    disabledField={true}
                    required
                  />
                </div>
              </div>
              <div className='separator separator-content my-14'>
                <span className='w-250px text-gray-500 fw-semibold fs-7'>
                  Or with New Cashout Method
                </span>
              </div>
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <SelectField
                    className='form-select'
                    name={method.name}
                    label={method.label}
                    data={cashoutMethodsOptions}
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <InputField name={others.name} label={others.label} className='form-control' />
                </div>
              </div>
              <div className='row mb-5'>
                <div className='col-md-6'>
                  <InputField
                    name={accountName.name}
                    label={accountName.label}
                    className='form-control'
                    required
                  />
                </div>
                <div className='col-md-6'>
                  <InputField
                    name={accountNumber.name}
                    label={accountNumber.label}
                    className='form-control'
                    required
                  />
                </div>
              </div>
            </div>
            <div className='d-flex align-items-stretch justify-content-between pt-15'>
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
                <span className='indicator-label'>Request</span>
                {actions.isSubmitting && (
                  <span className='indicator-progress'>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default CashoutsCreateForm
