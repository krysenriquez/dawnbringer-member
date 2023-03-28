import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {toCurrency, toPoints} from '@/utils/toCurrency'

const referralsColumn = [
  {
    header: 'Order #',
    accessorFn: (row) => row.orderNumber,
    id: 'orderNumber',
    cell: (info) => {
      return (
        <div className='ps-4'>
          <span>{info.getValue()}</span>
        </div>
      )
    },
  },
  {
    header: 'Membership Level',
    accessorFn: (row) => row.pointValueMembershipName,
    id: 'pointValueMembershipName',
    cell: (info) => info.getValue(),
  },
  {
    header: 'Points',
    accessorFn: (row) => row.pointValue,
    id: 'pointValue',
    cell: (info) => toPoints(info.getValue()),
  },
  {
    header: 'Status',
    accessorFn: (row) => row.currentOrderStatus,
    id: 'currentOrderStatus',
    cell: (info) => {
      const intl = useIntl()
      return (
        <div
          className={clsx('badge fw-bolder d-inline', {
            'badge-light-warning': info.getValue() == 'PENDING',
            'badge-light-info':
              info.getValue() == 'AWAITING_DELIVERY' ||
              info.getValue() == 'AWAITING_PICKUP' ||
              info.getValue() == 'ON_DELIVERY' ||
              info.getValue() == 'ON_PICKUP',
            'badge-light-danger': info.getValue() == 'CANCELLED' || info.getValue() == 'REFUNDED',
            'badge-light-success': info.getValue() == 'COMPLETED',
          })}
        >
          {info.getValue() ? intl.formatMessage({id: info.getValue()}) : <></>}
        </div>
      )
    },
  },
]

export default referralsColumn
