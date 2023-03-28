import clsx from 'clsx'
import {useIntl} from 'react-intl'
import {useThemeMode} from '@/providers/ThemeModeProvider'
import {
  useProfileInfoQueryData,
  useProfileInfoQueryLoading,
} from '../../stores/ProfileInfoQueryProvider'
import CustomCard from '@/components/elements/Card/CustomCard'

const ProfileInfo = () => {
  const intl = useIntl()
  const profileInfo = useProfileInfoQueryData()
  const isLoading = useProfileInfoQueryLoading()

  const theme = useThemeMode()
  const defaultThumbnail =
    `/media/files/blank-image` + (theme.mode === 'light' ? '.svg' : '-dark.svg')

  return (
    <>
      {profileInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Summary</h2>}
          bodyClassName='pt-0'
        >
          <>
            <div className='d-flex flex-center flex-column mb-5'>
              <div className='symbol symbol-150px symbol-lg-160px symbol-circle mb-7'>
                <img
                  src={`${
                    profileInfo.avatarInfo.avatar ? profileInfo.avatarInfo.avatar : defaultThumbnail
                  }`}
                  alt='image'
                />
              </div>
              <div className='fs-3 text-gray-800 fw-bold mb-1'>{profileInfo.fullName}</div>
              <div
                className={clsx('badge d-inline fw-bolder mb-6', {
                  'badge-light-success': profileInfo.accountStatus == 'ACTIVE',
                  'badge-light-warning':
                    profileInfo.accountStatus == 'DRAFT' || profileInfo.accountStatus == 'PENDING',
                  'badge-light-danger':
                    profileInfo.accountStatus == 'INACTIVE' ||
                    profileInfo.accountStatus == 'DEACTIVATED' ||
                    profileInfo.accountStatus == 'CLOSED',
                })}
              >
                {intl.formatMessage({id: profileInfo.accountStatus})}
              </div>
            </div>
            <div className='pb-5 fs-6'>
              <div className='fw-bold mt-5'>Account Number</div>
              <div className='text-gray-600'>{profileInfo.accountNumber}</div>
              <div className='fw-bold mt-5'>Birthdate</div>
              {profileInfo.personalInfo && (
                <>
                  <div className='text-gray-600'>
                    {profileInfo.personalInfo.birthdate ? profileInfo.personalInfo.birthdate : '--'}
                  </div>
                  <div className='fw-bold mt-5'>Gender</div>
                  <div className='text-gray-600'>
                    {profileInfo.personalInfo.gender
                      ? intl.formatMessage({id: profileInfo.personalInfo.gender})
                      : '--'}
                  </div>
                </>
              )}
              {profileInfo.contactInfo && (
                <>
                  <div className='fw-bold mt-5'>Contact Number</div>
                  <div className='text-gray-600'>
                    {profileInfo.contactInfo.contactNumber
                      ? profileInfo.contactInfo.contactNumber
                      : '--'}
                  </div>
                </>
              )}
              {profileInfo.addressInfo &&
                profileInfo.addressInfo
                  .filter((address) => {
                    return address.isDefault == true
                  })
                  .map((address) => {
                    return (
                      <div key={address.addressType}>
                        <div className='fw-bold mt-5'>Default Address</div>
                        <div className='text-gray-600'>
                          {address.address1 ||
                          address.address2 ||
                          address.city ||
                          address.zip ||
                          address.province ||
                          address.country ? (
                            <>
                              {[address.address1, address.address2].join(', ')} <br />
                              {[address.city, address.province, address.zip].join(', ')}
                              <br />
                              {address.country}
                            </>
                          ) : (
                            '--'
                          )}
                        </div>
                      </div>
                    )
                  })}
            </div>
          </>
        </CustomCard>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProfileInfo
