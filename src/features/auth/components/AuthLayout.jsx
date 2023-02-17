import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const AuthLayout = () => {
  useEffect(() => {
    document.body.style.backgroundImage = 'none'
    return () => {}
  }, [])

  return (
    <>
      <div className='d-block d-lg-none mx-auto py-20'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/logos/lr-logo-horizontal.png')}
          className='theme-dark-show h-50px'
        />
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/logos/lr-logo-horizontal.png')}
          className='theme-light-show h-50px'
        />
      </div>
      <div className='d-flex flex-column flex-column-fluid flex-center w-lg-50 p-10'>
        <div className='d-flex justify-content-center flex-column-fluid flex-column w-100 mw-450px'>
          <div className='py-20 mt-lg-10 '>
            <Outlet />
          </div>
        </div>
      </div>
      <div
        className='d-none d-lg-flex flex-lg-row-fluid w-50 bgi-size-cover bgi-position-y-center bgi-position-x-start bgi-no-repeat'
        style={{backgroundImage: 'url(/media/bg/bg11.png)'}}
      ></div>
    </>
  )
}
