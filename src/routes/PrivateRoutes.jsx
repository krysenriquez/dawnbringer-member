import {lazy} from 'react'
import {Navigate, useRoutes} from 'react-router-dom'
import {MainLayout} from '@/components/layouts/main/elements/MainLayout'
import {SuspensedView} from '@/utils/suspensedView'
import DashboardRoutes from '@/features/dashboard/routes'

const PrivateRoutes = () => {
  // const Dashboard = lazy(() => import('@/features/dashboard/routes'))

  const routes = useRoutes([
    {
      path: '/*',
      element: <MainLayout />,
      children: [
        {path: '*', element: <Navigate to='dashboard' />},
        {path: 'dashboard/*', element: <DashboardRoutes />},
      ],
    },
  ])
  return <>{routes}</>
}

export default PrivateRoutes
