import {useEffect, useMemo} from 'react'
import CustomCard from '@/components/elements/Card/CustomCard'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {
  useOrdersListQueryData,
  useOrdersListQueryLoading,
} from '../../stores/OrdersListQueryProvider'
import ordersColumn from './OrdersListColumn'

const OrdersListTable = () => {
  const orders = useOrdersListQueryData()
  const isLoading = useOrdersListQueryLoading()

  const tableData = useMemo(() => orders, [orders])
  const tableColumns = useMemo(() => ordersColumn, [])

  return (
    <>
      <CustomCard>
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
      </CustomCard>
    </>
  )
}

export default OrdersListTable
