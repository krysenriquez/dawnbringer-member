import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useActivitiesListQueryData,
  useActivitiesListQueryLoading,
} from '../../stores/ActivitiesListQueryProvider'

import activitiesColumn from './ActivitiesListColumn'

const ActivitiesListTable = () => {
  const navigate = useNavigate()
  const activities = useActivitiesListQueryData()
  const isLoading = useActivitiesListQueryLoading()
  const tableData = useMemo(() => activities, [activities])
  const tableColumns = useMemo(() => activitiesColumn, [])

  const handleClick = (e) => {}

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: false,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
      </CustomCardWithoutHeader>
    </>
  )
}

export default ActivitiesListTable
