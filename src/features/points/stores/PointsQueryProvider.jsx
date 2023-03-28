import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {useAccount} from '@/providers/AccountProvider'
import {getMembershipLevelPoints, GET_MEMBERSHIP_LEVEL_POINTS} from '../api'

const PointsQueryContext = createContext(initialQuery)

const PointsQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_MEMBERSHIP_LEVEL_POINTS}`,
    () => {
      return getMembershipLevelPoints()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return <PointsQueryContext.Provider value={value}>{children}</PointsQueryContext.Provider>
}

const usePointsQueryContext = () => useContext(PointsQueryContext)

const usePointsQueryData = () => {
  const {response} = usePointsQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const usePointsQueryLoading = () => {
  const {isLoading} = usePointsQueryContext()
  return isLoading
}

export {PointsQueryProvider, usePointsQueryContext, usePointsQueryData, usePointsQueryLoading}
