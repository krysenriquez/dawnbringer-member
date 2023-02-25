import {useEffect, useMemo} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useReferralsListQueryData,
  useReferralsListQueryLoading,
} from '../../stores/ReferralListQueryProvider'
import referralsColumn from './ReferralsListColumn'

const ReferralsListTable = () => {
  const referrals = useReferralsListQueryData()
  const isLoading = useReferralsListQueryLoading()

  const tableData = useMemo(() => referrals, [referrals])
  const tableColumns = useMemo(() => referralsColumn, [])

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolBar: false,
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

export default ReferralsListTable
