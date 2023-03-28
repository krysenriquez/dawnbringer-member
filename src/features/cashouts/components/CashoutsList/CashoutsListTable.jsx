import {useState, useMemo} from 'react'
import CustomCardWithoutHeader from '@/components/elements/Card/CustomCardWithoutHeader'
import CustomTable from '@/components/elements/Table/CustomTable'
import TableLoading from '@/components/elements/Table/TableLoading'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  useCashoutsListQueryData,
  useCashoutsListQueryLoading,
} from '../../stores/CashoutsListQueryProvider'

import cashoutsColumn from './CashoutsColumn'
import CashoutsCreateForm from '../CashoutsCreate/CashoutsCreateForm'
import {CashoutCreateProvider} from '@/features/cashouts/stores/CashoutCreateProvider'

const ProcessCashoutCreate = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Request Cashout',
  }

  return (
    <CustomModal {...value}>
      <CashoutCreateProvider>
        <CashoutsCreateForm />
      </CashoutCreateProvider>
    </CustomModal>
  )
}

const CashoutsListTable = () => {
  const cashouts = useCashoutsListQueryData()
  const isLoading = useCashoutsListQueryLoading()
  const tableData = useMemo(() => cashouts, [cashouts])
  const tableColumns = useMemo(() => cashoutsColumn, [])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <CustomCardWithoutHeader>
        {tableData ? (
          <CustomTable
            {...{
              data: tableData,
              columns: tableColumns,
              hasToolbar: true,
              toolbarButtonName: 'Request Cashout',
              handleToolbarButtonClick: toggleModal,
            }}
          />
        ) : (
          <></>
        )}
        {isLoading && <TableLoading />}
        {isModalOpen && (
          <ProcessCashoutCreate isModalOpen={isModalOpen} toggleModal={toggleModal} />
        )}
      </CustomCardWithoutHeader>
    </>
  )
}

export default CashoutsListTable
