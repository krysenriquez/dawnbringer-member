import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {useAccount} from '../../../providers/AccountProvider'
import {
  getCashoutMethods,
  getAccountCashoutMethods,
  getWalletCashoutSchedules,
  getCashoutTotalFee,
} from '../api'

const CashoutCreateContext = createContext({
  accountCashoutMethods: undefined,
  cashoutSchedules: undefined,
  cashoutMethods: undefined,
  cashoutTotalFee: undefined,
})

const useCashoutCreate = () => {
  return useContext(CashoutCreateContext)
}

const CashoutCreateProvider = ({children}) => {
  const {currentAccount} = useAccount()
  const didRequestAccountCashoutMethods = useRef(false)
  const didRequestCashoutMethods = useRef(false)
  const didRequestCashoutSchedules = useRef(false)
  const didRequestCashoutTotalFee = useRef(false)
  const [cashoutMethods, setCashoutMethods] = useState(undefined)
  const [accountCashoutMethods, setAccountCashoutMethods] = useState(undefined)
  const [cashoutSchedules, setCashoutSchedules] = useState(undefined)
  const [cashoutTotalFee, setCashoutTotalFee] = useState(undefined)

  useEffect(() => {
    const requestAccountCashoutMethods = async () => {
      try {
        if (!didRequestAccountCashoutMethods.current) {
          const data = await getAccountCashoutMethods()
          if (data.length > 0) {
            setAccountCashoutMethods(data)
          }
        }
      } catch (error) {
        if (!didRequestAccountCashoutMethods.current) {
          toast.error('Unable to fetch Account Cashout Methods')
        }
      }

      return () => (didRequestAccountCashoutMethods.current = true)
    }

    const requestCashoutMethods = async () => {
      try {
        if (!didRequestCashoutMethods.current) {
          const data = await getCashoutMethods()
          if (data.length > 0) {
            setCashoutMethods(data)
          }
        }
      } catch (error) {
        if (!didRequestCashoutMethods.current) {
          toast.error('Unable to fetch Cashout Methods')
        }
      }

      return () => (didRequestCashoutMethods.current = true)
    }

    const requestCashoutSchedules = async () => {
      try {
        if (!didRequestCashoutSchedules.current) {
          const {data} = await getWalletCashoutSchedules()
          if (data.detail.length > 0) {
            setCashoutSchedules(data.detail)
          }
        }
      } catch (error) {
        if (!didRequestCashoutSchedules.current) {
          toast.error('Unable to fetch Cashout Schedule')
        }
      }

      return () => (didRequestCashoutSchedules.current = true)
    }

    const requestCashoutTotalFee = async () => {
      try {
        if (!didRequestCashoutTotalFee.current) {
          const data = await getCashoutTotalFee()
          if (data) {
            setCashoutTotalFee(data)
          }
        }
      } catch (error) {
        if (!didRequestCashoutTotalFee.current) {
          toast.error('Unable to fetch Cashout Total Fee')
        }
      }

      return () => (didRequestCashoutTotalFee.current = true)
    }

    if (currentAccount) {
      requestAccountCashoutMethods()
      requestCashoutMethods()
      requestCashoutSchedules()
      requestCashoutTotalFee()
    }
  }, [currentAccount])

  return (
    <CashoutCreateContext.Provider
      value={{
        cashoutTotalFee,
        accountCashoutMethods,
        cashoutSchedules,
        cashoutMethods,
      }}
    >
      {children}
    </CashoutCreateContext.Provider>
  )
}

export {CashoutCreateProvider, useCashoutCreate}
