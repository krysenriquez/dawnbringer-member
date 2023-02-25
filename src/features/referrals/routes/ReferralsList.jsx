import {ReferralsListQueryProvider} from '../stores/ReferralListQueryProvider'
import ReferralsListTable from '../components/ReferralsList/ReferralsListTable'

const ReferralsList = () => {
  return (
    <ReferralsListQueryProvider>
      <ReferralsListTable />
    </ReferralsListQueryProvider>
  )
}

export default ReferralsList
