import {useState} from 'react'
import {useIntl} from 'react-intl'
import clsx from 'clsx'
import {format} from 'date-fns'
import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import classnames from 'classnames'

const OrderStatus = () => {
  const intl = useIntl()
  const order = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  return (
    <>
      {order && order.histories && !isLoading ? (
        <div className='card card-flush py-4'>
          <div className='card-header'>
            <div className='card-title'>
              <h2>History</h2>
            </div>
          </div>
          <div className='card-body pt-0'>
            <div className='timeline ms-n1'>
              {order.histories.map((history, index) => {
                return (
                  <div className='timeline-item align-items-center mb-4' key={history.id}>
                    <div className='timeline-line w-20px mt-12 mb-n14' />
                    <div className='timeline-icon pt-1' style={{marginLeft: '0.7px'}}>
                      <CustomSVG
                        className={clsx('svg-icon svg-icon-2', {
                          'svg-icon-warning': history.orderStatus == 'PENDING',
                          'svg-icon-info':
                            history.orderStatus == 'AWAITING_DELIVERY' ||
                            history.orderStatus == 'AWAITING_PICKUP' ||
                            history.orderStatus == 'ON_DELIVERY' ||
                            history.orderStatus == 'ON_PICKUP',
                          'svg-icon-danger':
                            history.orderStatus == 'CANCELLED' || history.orderStatus == 'REFUNDED',
                          'svg-icon-success': history.orderStatus == 'COMPLETED',
                        })}
                        path='/media/icons/general/circle-full.svg'
                      />
                    </div>
                    <div className='timeline-content m-0'>
                      <span
                        className={clsx('fs-8 fw-bolder text-uppercase', {
                          'text-warning': history.orderStatus == 'PENDING',
                          'text-primary':
                            history.orderStatus == 'AWAITING_DELIVERY' ||
                            history.orderStatus == 'AWAITING_PICKUP' ||
                            history.orderStatus == 'ON_DELIVERY' ||
                            history.orderStatus == 'ON_PICKUP',
                          'text-danger':
                            history.orderStatus == 'CANCELLED' || history.orderStatus == 'REFUNDED',
                          'text-success': history.orderStatus == 'COMPLETED',
                        })}
                      >
                        {intl.formatMessage({id: history.orderStatus})}
                      </span>
                      <span
                        className={classnames('fs-6 fw-bold d-block', {
                          'text-gray-800': index === 0,
                          'text-gray-400': index !== 0,
                        })}
                      >
                        {history.orderNote}
                      </span>
                      <span className='fs-7 text-gray-400 fw-bold d-block'>{history.comment}</span>
                      <span className='fw-semibold text-gray-400'>
                        {history.created &&
                          format(Date.parse(history.created), 'dd/MM/yyyy hh:mm:ss aa')}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default OrderStatus
