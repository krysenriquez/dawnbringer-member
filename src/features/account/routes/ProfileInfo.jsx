import {ProfileInfoQueryProvider} from '../stores/ProfileInfoQueryProvider'
import AccountInfoPage from '../components/AccountInfoPage'

const AccountInfo = () => {
  return (
    <ProfileInfoQueryProvider>
      <AccountInfoPage />
    </ProfileInfoQueryProvider>
  )
}

export default AccountInfo
