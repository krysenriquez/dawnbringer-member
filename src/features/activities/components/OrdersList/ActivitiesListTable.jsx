import {useEffect, useMemo, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable2 from '@/components/elements/Table/CustomTable2'
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
          <CustomTable2
            {...{
              data: tableData,
              columns: tableColumns,
              title: <h2>Activities</h2>,
              handleClick: handleClick,
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
