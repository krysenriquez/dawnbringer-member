import {createContext, useContext} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {useGlobalState} from '@/providers/GlobalStateProvider'
import {getAddress, GET_ADDRESS_URL} from '../api'

const AddressInfoQueryContext = createContext(initialQuery)

const AddressInfoQueryProvider = ({children}) => {
  const {param} = useGlobalState()

  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_ADDRESS_URL}-${param}`,
    () => {
      return getAddress(param)
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <AddressInfoQueryContext.Provider value={value}>{children}</AddressInfoQueryContext.Provider>
  )
}

const useAddressInfoQueryContext = () => {
  return useContext(AddressInfoQueryContext)
}

const useAddressInfoQueryData = () => {
  const {response} = useAddressInfoQueryContext()
  if (!response) {
    return {}
  }

  return response || {}
}

const useAddressInfoQueryLoading = () => {
  const {isLoading} = useAddressInfoQueryContext()
  return isLoading
}

export {
  AddressInfoQueryProvider,
  useAddressInfoQueryContext,
  useAddressInfoQueryData,
  useAddressInfoQueryLoading,
}
