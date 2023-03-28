import {PointsQueryProvider} from '@/features/points/stores/PointsQueryProvider'
import {PointConversionProvider} from '@/features/points/stores/PointConversionProvider'
import Code from './widgets/Code'
import Referrals from './widgets/Referrals'
import MembershipPoints from './widgets/MembershipPoints'

const DashboardPage = () => {
  return (
    <>
      <div className='row g-5 g-xl-8 mb-5 mb-xl-2'>
        <div className='col-xl-6'>
          <Code />
        </div>
        <div className='col-xl-6'>
          <PointsQueryProvider>
            <PointConversionProvider>
              <MembershipPoints />
            </PointConversionProvider>
          </PointsQueryProvider>
        </div>
      </div>
      <div className='row g-5 g-xl-8 mb-5 mb-xl-2'>
        <div className='col-xl-12'>
          <Referrals />
        </div>
      </div>
    </>
  )
}

export default DashboardPage
