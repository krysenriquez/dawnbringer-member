import {useLayout} from '@/providers/layout/LayoutProvider'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const MobileToggle = () => {
  const {config} = useLayout()

  return (
    <div className={config.app.header.container.mobileToggle.class} title='Show sidebar menu'>
      <div className='btn btn-icon btn-active-color-primary w-35px h-35px me-2' id="app_header_menu_mobile_toggle">
        <CustomSVG path='/media/icons/hamburger.svg' className='svg-icon-2 svg-icon' />
      </div>
    </div>
  )
}

export default MobileToggle
