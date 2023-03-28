import {useState} from 'react'
import CustomTabs from '@/components/elements/Tabs/CustomTabs'
import {Tab} from 'react-bootstrap'
import CustomCard from '@/components/elements/Card/CustomCard'
import {
  useProfileInfoQueryData,
  useProfileInfoQueryLoading,
} from '../stores/ProfileInfoQueryProvider'
import {GlobalStateProvider} from '@/providers/GlobalStateProvider'
import ProfileInfo from './Profile/ProfileInfo'
import ProfileForm from './Profile/Form/ProfileForm'
import AddressInfo from './Address/AddressInfo'
import ChangeUsername from './Username/ChangeUsername'
import ChangePassword from './Password/ChangePassword'
import ChangeEmailAddress from './EmailAddress/ChangeEmaillAddress'

const AccountInfoPage = () => {
  const profileInfo = useProfileInfoQueryData()
  const isLoading = useProfileInfoQueryLoading()
  const [tab, setTab] = useState('general')

  return (
    <>
      {Object.keys(profileInfo).length > 0 && !isLoading ? (
        <>
          <div className='d-flex flex-column flex-xl-row'>
            <div className='flex-column flex-lg-row-auto w-100 w-xl-350px mb-10'>
              <ProfileInfo />
            </div>
            <div className='flex-lg-row-fluid ms-xl-10'>
              <CustomTabs
                className='nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8'
                defaultActiveKey='general'
                activeKey={tab}
                onSelect={(k) => setTab(k)}
              >
                <Tab eventKey='general' title='General'>
                  {tab == 'general' ? (
                    <>
                      <>
                        <ProfileForm />
                        <GlobalStateProvider>
                          <AddressInfo />
                        </GlobalStateProvider>
                      </>
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
                <Tab eventKey='advanced' title='Advanced'>
                  {tab == 'advanced' ? (
                    <>
                      <CustomCard
                        cardClassName='card-flush mb-5 mb-xl-8'
                        hasHeader={true}
                        header={<h2>Summary</h2>}
                        bodyClassName='pt-0'
                      >
                        <>
                          <ChangeUsername />
                          <div className='separator separator-dashed my-6' />
                          <ChangeEmailAddress />
                          <div className='separator separator-dashed my-6' />
                          <ChangePassword />
                        </>
                      </CustomCard>
                    </>
                  ) : (
                    <></>
                  )}
                </Tab>
              </CustomTabs>
            </div>
          </div>
        </>
      ) : (
        <>
          <>
            <div className='text-center'>
              <h2>No Record Found</h2>
            </div>
          </>
        </>
      )}
    </>
  )
}

export default AccountInfoPage
