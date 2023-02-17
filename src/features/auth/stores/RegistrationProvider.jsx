/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {useSearchParams, useNavigate} from 'react-router-dom'
import {verifyRegistration} from '../api'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {toast} from 'react-toastify'

const RegistrationContext = createContext({
  verified: false,
  data: undefined,
})

const RegistrationProvider = ({children}) => {
  const swal = withReactContent(Swal)
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const didRequest = useRef(false)
  const urlData = searchParams.get('data')
  const [verified, setVerified] = useState(false)
  const [data, setData] = useState(undefined)

  useEffect(() => {
    const validateRegistrationLink = async () => {
      try {
        if (!didRequest.current) {
          const data = await verifyRegistration({data: urlData})
          if (data) {
            swal.fire('Link Verified!', data.detail, 'success').then((result) => {
              setVerified(true)
              setData(urlData)
            })
          }
        }
      } catch (error) {
        if (!didRequest.current) {
          swal.fire('Invalid Link!', error.response.data.detail, 'error').then((result) => {
            setVerified(false)
            setData(undefined)
            navigate('/')
          })
        }
      }

      return () => (didRequest.current = true)
    }

    if (urlData) {
      validateRegistrationLink()
    }
  }, [urlData])

  const value = {
    verified,
    data,
  }
  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>
}

const useRegistrationContext = () => {
  return useContext(RegistrationContext)
}

export {RegistrationProvider, useRegistrationContext}
