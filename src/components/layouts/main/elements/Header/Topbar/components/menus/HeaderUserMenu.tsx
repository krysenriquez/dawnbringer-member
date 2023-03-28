import {Link} from 'react-router-dom'
import {useAuth} from '@/providers/AuthProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

const HeaderUserMenu = () => {
  const {currentUser, logout} = useAuth()
  const blankAvatar = toAbsoluteUrl('/media/avatars/blank.png')

  return (
    <>
      <div
        className='cursor-pointer symbol symbol-35px symbol-md-40px'
        data-menu-trigger="{default: 'click', lg: 'hover'}"
        data-menu-attach='parent'
        data-menu-placement='bottom-end'
      >
        <img
          className='symbol symbol-circle symbol-35px symbol-md-40px'
          src={currentUser?.userAvatar ? currentUser?.userAvatar : blankAvatar}
          alt='user'
        />
      </div>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
        data-menu='true'
      >
        <div className='menu-item px-3'>
          <div className='menu-content d-flex align-items-center px-3'>
            <div className='symbol symbol-50px me-5'>
              <img
                alt='Logo'
                src={currentUser?.userAvatar ? currentUser?.userAvatar : blankAvatar}
              />
            </div>
            <div>
              <div className='fw-bolder d-flex align-items-center fs-5'>
                {currentUser?.displayName}
              </div>
              <div className='badge badge-light-success fw-bolder fs-8'>
                {currentUser?.userType}
              </div>
            </div>
          </div>
        </div>
        <div className='separator my-2'></div>
        <div className='menu-item px-5'>
          <Link to={'/account'} className='menu-link px-5'>
            My Account
          </Link>
        </div>
        <div className='menu-item px-5'>
          <a onClick={logout} className='menu-link px-5'>
            Sign Out
          </a>
        </div>
      </div>
    </>
  )
}

export default HeaderUserMenu
