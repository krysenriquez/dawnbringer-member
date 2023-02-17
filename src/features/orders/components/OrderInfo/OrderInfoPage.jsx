import {
  useOrderInfoQueryData,
  useOrderInfoQueryLoading,
} from '@/features/orders/stores/OrderInfoQueryProvider'
import {Tab, Nav} from 'react-bootstrap'
import OrderDetails from './components/OrderDetails'
import OrderCustomer from './components/OrderCustomer'
import OrderDocuments from './components/OrderDocuments'
import OrderAddress from './components/OrderAddress'
import OrderTable from './components/OrderTable'
import OrderStatus from './components/OrderStatus'
import {useNavigate} from 'react-router-dom'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const OrderInfoPage = () => {
  const navigate = useNavigate()
  const order = useOrderInfoQueryData()
  const isLoading = useOrderInfoQueryLoading()

  const handleView = () => {
    navigate(`/orders`)
  }

  return (
    <>
      {Object.keys(order).length > 0 && !isLoading ? (
        <Tab.Container id='left-tabs-example' defaultActiveKey='summary'>
          <div className='d-flex flex-column gap-7 gap-lg-10'>
            <div className='d-flex flex-wrap flex-stack gap-5 gap-lg-10'>
              <Nav className="className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-lg-n2 me-auto'">
                <Nav.Item>
                  <Nav.Link eventKey='summary' className='nav-link text-active-primary pb-4'>
                    Order Summary
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='history' className='nav-link text-active-primary pb-4'>
                    Order History
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <button
                className='btn btn-icon btn-light btn-sm ms-auto'
                onClick={() => handleView()}
              >
                <CustomSVG path='/media/icons/arrows/caret-left.svg' className='svg-icon-2' />
              </button>
            </div>
            <div className='flex-lg-row-fluid ms-lg-7 ms-xl-1 d-flex flex-column gap-7 gap-lg-10'>
              <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                <OrderDetails />
                <OrderCustomer />
                <OrderDocuments />
              </div>
              <Tab.Content>
                <Tab.Pane eventKey='summary'>
                  <div className='d-flex flex-column gap-7 gap-lg-10'>
                    <div className='d-flex flex-column flex-xl-row gap-7 gap-lg-10'>
                      <OrderAddress />
                    </div>
                    <OrderTable />
                  </div>
                </Tab.Pane>
              </Tab.Content>
              <Tab.Content>
                <Tab.Pane eventKey='history'>
                  <div className='d-flex flex-column gap-7 gap-lg-10'>
                    <OrderStatus />
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </div>
          </div>
        </Tab.Container>
      ) : (
        <>
          <div className='text-center'>
            <h2>No Record Found</h2>
          </div>
        </>
      )}
    </>
  )
}

export default OrderInfoPage
