/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getReferrals, GET_REFERRALS_URL} from '../api'

const ReferralsListQueryContext = createContext(initialQuery)

const ReferralsListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_REFERRALS_URL}`,
    () => {
      return getReferrals()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <ReferralsListQueryContext.Provider value={value}>
      {children}
    </ReferralsListQueryContext.Provider>
  )
}

const useReferralsListQueryContext = () => {
  return useContext(ReferralsListQueryContext)
}

const useReferralsListQueryData = () => {
  const {response} = useReferralsListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useReferralsListQueryLoading = () => {
  const {isLoading} = useReferralsListQueryContext()
  return isLoading
}

export {
  ReferralsListQueryProvider,
  useReferralsListQueryContext,
  useReferralsListQueryData,
  useReferralsListQueryLoading,
}
