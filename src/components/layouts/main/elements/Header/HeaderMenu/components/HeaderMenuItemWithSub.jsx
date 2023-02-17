import {useRef, useEffect} from 'react'
import {useLocation} from 'react-router'
import clsx from 'clsx'
import {checkIsActive} from '@/utils/checkIsActive'
import CustomSVG from '@/components/elements/SVG/CustomSVG'

const MenuInnerWithSub = (props) => {
  const {
    children,
    to,
    title,
    icon,
    fontIcon,
    menuTrigger,
    menuPlacement,
    hasArrow = false,
    hasBullet = false,
    isMega = false,
  } = props
  const menuItemRef = useRef(null)
  const {pathname} = useLocation()

  useEffect(() => {
    if (menuItemRef.current && menuTrigger && menuPlacement) {
      menuItemRef.current.setAttribute('data-menu-trigger', menuTrigger)
      menuItemRef.current.setAttribute('data-menu-placement', menuPlacement)
    }
  }, [menuTrigger, menuPlacement])

  return (
    <div ref={menuItemRef} className='menu-item menu-lg-down-accordion me-lg-1'>
      <span
        className={clsx('menu-link py-3', {
          active: checkIsActive(pathname, to),
        })}
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
        <span className='menu-title'>{title}</span>
        {hasArrow && <span className='menu-arrow'></span>}
      </span>
      <div
        className={clsx(
          'menu-sub menu-sub-lg-down-accordion menu-sub-lg-dropdown',
          isMega ? 'w-100 w-lg-600px p-5 p-lg-5' : 'menu-rounded-0 py-lg-4 w-lg-225px'
        )}
        data-menu-dismiss='true'
      >
        {children}
      </div>
    </div>
  )
}

export {MenuInnerWithSub}
