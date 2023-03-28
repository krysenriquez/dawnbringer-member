import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {format} from 'date-fns'
import {toCurrency} from '@/utils/toCurrency'
import {useNavigate} from 'react-router-dom'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'

const cashoutsColumn = [
  {
    header: 'Cashout #',
    accessorFn: (row) => row.activityNumber,
    id: 'activityNumber',
    cell: (info) => <span className='ms-4'>{info.getValue()}</span>,
  },
  {
    header: 'Amount',
    accessorFn: (row) => row.activityAmount,
    id: 'activityAmount',
    cell: (info) => {
      const intl = useIntl()
      return toCurrency(info.getValue())
    },
  },
  {
    header: 'Processing Fee',
    accessorFn: (row) => parseFloat(row.activityAmount) - parseFloat(row.activityAmountTotal),
    id: 'activityAdminFee',
    cell: (info) => {
      const intl = useIntl()
      return toCurrency(info.getValue())
    },
  },
  {
    header: 'Total Amount',
    accessorFn: (row) => row.activityAmountTotal,
    id: 'activityAmountTotal',
    cell: (info) => {
      const intl = useIntl()
      return toCurrency(info.getValue())
    },
  },
  {
    header: 'Wallet',
    accessorFn: (row) => row.wallet,
    id: 'wallet',
    cell: (info) => {
      const intl = useIntl()
      return intl.formatMessage({id: info.getValue()})
    },
  },
  {
    header: 'Status',
    accessorFn: (row) => row.status,
    id: 'status',
    cell: (info) => {
      const intl = useIntl()
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'REQUESTED',
            'badge-light-info': info.getValue() == 'APPROVED',
            'badge-light-danger': info.getValue() == 'DENIED',
            'badge-light-success': info.getValue() == 'DONE' || info.getValue() == 'RELEASED',
          })}
        >
          {info.getValue() ? intl.formatMessage({id: info.getValue()}) : <></>}
        </div>
      )
    },
  },
  {
    header: 'Created',
    accessorFn: (row) => row.created,
    id: 'created',
    cell: (info) => {
      return format(Date.parse(info.getValue()), 'dd/MM/yyyy')
    },
  },
  {
    header: 'Actions',
    accessorFn: (row) => row.activityNumber,
    id: 'cashoutAction',
    cell: (info) => {
      const navigate = useNavigate()

      const handleView = () => {
        navigate(`${info.row.original.activityNumber}`, {
          state: {activityNumber: info.row.original.activityNumber},
        })
      }

      return (
        <>
          <ActionCell
            handleClick={handleView}
            className='btn btn-icon btn-icon-primary btn-light btn-sm border-0 me-2'
          >
            <CustomSVG path='/media/icons/general/magnifying-glass.svg' className='svg-icon-2' />
          </ActionCell>
        </>
      )
    },
  },
]

export default cashoutsColumn
