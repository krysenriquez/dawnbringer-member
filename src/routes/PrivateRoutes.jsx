import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/elements/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'

const PrivateRoutes = () => {
  const Dashboard = lazy(() => import('@/features/dashboard/routes'))
  const Orders = lazy(() => import('@/features/orders/routes'))
  const Activities = lazy(() => import('@/features/activities/routes'))
  const Cashouts = lazy(() => import('@/features/cashouts/routes'))
  const Account = lazy(() => import('@/features/account/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        {path: '*', element: <Navigate to='dashboard' />},
        {
          path: 'dashboard/*',
          element: (
            <SuspensedView>
              <Dashboard />
            </SuspensedView>
          ),
        },
        {
          path: 'orders/*',
          element: (
            <SuspensedView>
              <Orders />
            </SuspensedView>
          ),
        },
        {
          path: 'activities/*',
          element: (
            <SuspensedView>
              <Activities />
            </SuspensedView>
          ),
        },
        {
          path: 'cashouts/*',
          element: (
            <SuspensedView>
              <Cashouts />
            </SuspensedView>
          ),
        },
        {
          path: 'account/*',
          element: (
            <SuspensedView>
              <Account />
            </SuspensedView>
          ),
        },
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes
