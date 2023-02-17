import {useIntl} from 'react-intl'
import HeaderMenuItem from './components/HeaderMenuItem'

const HeaderMenuItems = () => {
  const intl = useIntl()
  return (
    <>
      <HeaderMenuItem to='/dashboard' title={intl.formatMessage({id: 'DASHBOARD'})} />
      <HeaderMenuItem to='/orders' title={intl.formatMessage({id: 'ORDERS'})} />
      <HeaderMenuItem to='/cashouts' title={intl.formatMessage({id: 'CASHOUTS'})} />
    </>
  )
}

export default HeaderMenuItems
