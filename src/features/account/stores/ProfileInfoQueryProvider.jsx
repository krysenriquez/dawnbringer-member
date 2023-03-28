/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getProfile, GET_PROFILE_URL} from '../api'

const ProfileInfoQueryContext = createContext(initialQuery)

const ProfileInfoQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_PROFILE_URL}`,
    () => {
      return getProfile()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }
  return (
    <ProfileInfoQueryContext.Provider value={value}>{children}</ProfileInfoQueryContext.Provider>
  )
}

const useProfileInfoQueryContext = () => {
  return useContext(ProfileInfoQueryContext)
}

const useProfileInfoQueryData = () => {
  const {response} = useProfileInfoQueryContext()
  if (!response) {
    return {}
  }

  return response || {}
}

const useProfileInfoQueryLoading = () => {
  const {isLoading} = useProfileInfoQueryContext()
  return isLoading
}

export {
  ProfileInfoQueryProvider,
  useProfileInfoQueryContext,
  useProfileInfoQueryData,
  useProfileInfoQueryLoading,
}
