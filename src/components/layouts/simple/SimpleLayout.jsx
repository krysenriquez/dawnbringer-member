import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'
import {LayoutSetup, getLayout} from '@/providers/layout/LayoutSetup'

export const SimpleLayout = () => {
  const layoutSetup = LayoutSetup
  const config = getLayout()

  useEffect(() => {
    if (layoutSetup) {
      layoutSetup.initSimpleLayout(config)
    }
  }, [layoutSetup, config])

  return (
    <div className='d-flex flex-column flex-center flex-column-fluid'>
      <Outlet />
    </div>
  )
}
