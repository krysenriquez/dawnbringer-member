import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {getAccount} from '@/features/auth/api'
import {toast} from 'react-toastify'
import {useAuth} from './AuthProvider'
import {useStateProviderContext} from './StateProvider'

const AccountContext = createContext({
  currentAccount: undefined,
  setCurrentAccount: (any) => {},
})

const useAccount = () => {
  return useContext(AccountContext)
}

const AccountProvider = ({children}) => {
  const {auth, logout} = useAuth()
  const {state} = useStateProviderContext()
  const [currentAccount, setCurrentAccount] = useState(undefined)
  const didRequest = useRef(false)

  useEffect(() => {
    const requestAccount = async () => {
      try {
        if (!didRequest.current) {
          const data = await getAccount()
          if (data.length > 0) {
            // Recheck
            setCurrentAccount(data[0])
          } else {
            toast.error('No Account linked to User. Logging out.')
            logout()
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          logout()
        }
      }

      return () => (didRequest.current = true)
    }

    if (auth) {
      requestAccount()
    }
  }, [auth, state])

  return (
    <AccountContext.Provider
      value={{
        currentAccount,
        setCurrentAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export {AccountProvider, useAccount}
