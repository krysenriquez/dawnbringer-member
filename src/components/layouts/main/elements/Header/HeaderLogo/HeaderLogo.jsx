import {useLayout} from '@/providers/layout/LayoutProvider'
import {Link} from 'react-router-dom'

const HeaderLogo = () => {
  const {config} = useLayout()

  return (
    <div className={config.app.header.container.headerLogo.class}>
      <Link to='/dashboard' className='app-header-logo' id='app_sidebar_logo'>
        <img alt='Logo' src='/media/logos/le_reussi_rectangle.png' className='h-30px d-sm-none' />
        <img
          alt='Logo'
          src='/media/logos/le_reussi_rectangle.png'
          className='h-50px d-none d-sm-inline app-sidebar-logo-default theme-dark-show'
        />
      </Link>
    </div>
  )
}

export default HeaderLogo
