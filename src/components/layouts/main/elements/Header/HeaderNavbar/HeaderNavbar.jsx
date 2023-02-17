import {useLayout} from '@/providers/layout/LayoutProvider'
import HeaderMenu from '../HeaderMenu/HeaderMenu'
import Topbar from '../Topbar/Topbar'

const HeaderNavbar = () => {
  const {config} = useLayout()

  return (
    <div className={config.app.header.container.navbar.class}>
      <HeaderMenu />
      <Topbar />
    </div>
  )
}

export default HeaderNavbar
