import {Route, Routes, Outlet} from 'react-router-dom'
import {useIntl} from 'react-intl'
import {PageTitle} from '@/providers/PageDataProvider'
import CashoutsList from './CashoutsList'
import CashoutInfo from './CashoutInfo'

const CashoutsRoutes = () => {
  const intl = useIntl()

  const codesBreadCrumbs = [
    {
      title: intl.formatMessage({id: 'CASHOUTS'}),
      path: '/cashouts',
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
            <PageTitle breadcrumbs={codesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'CASHOUTS.LIST'})}
            </PageTitle>
            <CashoutsList />
          </>
        }
      />
      <Route
        path=':activityNumber'
        element={
          <>
            <PageTitle breadcrumbs={codesBreadCrumbs} description=''>
              {intl.formatMessage({id: 'CASHOUTS.INFO'})}
            </PageTitle>
            <CashoutInfo />
          </>
        }
      />
    </Routes>
  )
}

export default CashoutsRoutes
