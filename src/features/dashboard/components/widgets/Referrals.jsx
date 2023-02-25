import {ReferralsListQueryProvider} from '@/features/referrals/stores/ReferralListQueryProvider'
import ReferralsListTable from '@/features/referrals/components/ReferralsList/ReferralsListTable'

const Referrals = () => {
  return (
    <ReferralsListQueryProvider>
      <ReferralsListTable />
    </ReferralsListQueryProvider>
  )
}

export default Referrals
