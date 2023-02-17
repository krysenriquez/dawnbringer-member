import clsx from 'clsx'
import {useLayout} from '@/providers/layout/LayoutProvider'
import MobileToggle from './MobileToggle/MobileToggle'
import HeaderLogo from './HeaderLogo/HeaderLogo'
import HeaderNavbar from './HeaderNavbar/HeaderNavbar'

const Header = () => {
  const {config, classes, attributes} = useLayout()

  return (
    <div className={clsx('app-header', classes.header.join(' '))} {...attributes.headerMenu}>
      <div
        className={clsx(
          'app-container',
          classes.headerContainer.join(' '),
          config.app.header.container.class
        )}
      >
        <MobileToggle />
        <HeaderLogo />
        <HeaderNavbar />
      </div>
    </div>
  )
}

export default Header
