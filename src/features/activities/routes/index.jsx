import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import ActivitiesList from './ActivitiesList'

const OrdersRoutes = () => {
  const intl = useIntl()

  const ordersBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'ACTIVITIES'}),
      path: '/orders',
      isSeparator: false,
      isActive: false,
    },
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]

  return (
    <Routes>
      <Route
        path=''
        element={
          <>
            <PageTitle breadcrumbs={ordersBreadCrumbs} description=''>
              {intl.formatMessage({id: 'ACTIVITIES.LIST'})}
            </PageTitle>
            <ActivitiesList />
          </>
        }
      />
    </Routes>
  )
}

export default OrdersRoutes
