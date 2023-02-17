import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {checkIsActive} from '@/utils/checkIsActive'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const HeaderMenuItem = (props) => {
  const {to, title, icon, fontIcon, hasArrow = false, hasBullet = false} = props
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)

  return (
    <div className='menu-item me-lg-1'>
      <Link
        className={clsx('menu-link py-3', {
          active: isActive,
        })}
        to={to}
      >
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && (
          <span className='menu-icon'>
            <CustomSVG path={icon} className='svg-icon-2' />
          </span>
        )}
        {fontIcon && (
          <span className='menu-icon'>
            <i className={clsx('bi fs-3', fontIcon)}></i>
          </span>
        )}
        <span className='menu-title fw-bold fs-6'>{title}</span>
        {hasArrow && <span className='menu-arrow'></span>}
      </Link>
    </div>
  )
}

export default HeaderMenuItem
