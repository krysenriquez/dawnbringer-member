import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'

export const AuthLayout = () => {
  return (
    <>
      <div className='d-flex flex-column flex-center p-10 w-lg-50 p-10'>
        <div className='card rounded-3 w-md-550px opacity-90'>
          <div className='card-body p-10 p-lg-20 pb-lg-1'>
            <div className='text-center mb-14'>
              <a href='/metronic8/demo6/../demo6/index.html'>
                <img
                  alt='Logo'
                  src='/media/logos/le_reussi_rectangle.png'
                  className='h-lg-70px h-50px'
                />
              </a>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
