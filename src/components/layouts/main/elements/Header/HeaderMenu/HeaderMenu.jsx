import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import HeaderMenuItems from './HeaderMenuItems'

const HeaderMenu = () => {
  const {config} = useLayout()

  return (
    <div className='d-flex align-items-stretch' id='app_header_nav'>
      <div
        className={clsx('app-header-menu', config.app.header.container.navbar.menu.class)}
        {...config.app.header.container.navbar.menu.attributes}
        data-swapper='true'
        data-swapper-mode='prepend'
        data-swapper-parent="{default: '#app_body', lg: '#app_header_nav'}"
      >
        <div
          className='menu menu-rounded menu-column menu-lg-row menu-active-bg menu-title-gray-700 menu-state-primary menu-arrow-gray-400 fw-semibold my-5 my-lg-0 align-items-stretch px-2 px-lg-0'
          id='#kt_header_menu'
          data-menu='true'
        >
          <HeaderMenuItems />
        </div>
      </div>
    </div>
  )
}

export default HeaderMenu
