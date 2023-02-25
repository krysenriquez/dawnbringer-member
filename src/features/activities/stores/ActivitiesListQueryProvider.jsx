/* eslint-disable react-hooks/exhaustive-deps */
import {createContext, useContext, useState, useEffect} from 'react'
import {useQuery} from 'react-query'
import {initialQuery} from '@/config/const'
import {getActivities, GET_ACTIVITIES_URL} from '../api'

const ActivitiesListQueryContext = createContext(initialQuery)

const ActivitiesListQueryProvider = ({children}) => {
  const {
    isFetching,
    refetch,
    data: response,
  } = useQuery(
    `${GET_ACTIVITIES_URL}`,
    () => {
      return getActivities()
    },
    {cacheTime: 0, keepPreviousData: true, refetchOnWindowFocus: false}
  )

  const value = {
    isLoading: isFetching,
    refetch,
    response,
  }

  return (
    <ActivitiesListQueryContext.Provider value={value}>
      {children}
    </ActivitiesListQueryContext.Provider>
  )
}

const useActivitiesListQueryContext = () => {
  return useContext(ActivitiesListQueryContext)
}

const useActivitiesListQueryData = () => {
  const {response} = useActivitiesListQueryContext()
  if (!response) {
    return []
  }

  return response || []
}

const useActivitiesListQueryLoading = () => {
  const {isLoading} = useActivitiesListQueryContext()
  return isLoading
}

export {
  ActivitiesListQueryProvider,
  useActivitiesListQueryContext,
  useActivitiesListQueryData,
  useActivitiesListQueryLoading,
}
