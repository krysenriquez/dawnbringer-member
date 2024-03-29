import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {PageDataProvider} from '@/providers/PageDataProvider'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {LayoutSetup, getLayout} from '@/providers/layout/LayoutSetup'
// Layout Components
import {Footer} from './Footer/Footer'
import Header from './Header/Header'
import Toolbar from './Toolbar/Toolbar'
import {Content} from './Content/Content'
import {ScrollTop} from './Content/ScrollTop'
import {MenuComponent} from '@/components/assets/components'

const MainLayout = () => {
  const location = useLocation()
  const layoutSetup = LayoutSetup
  const config = getLayout()

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      MenuComponent.reinitialization()
    }, 500)
  }, [location.key])

  useEffect(() => {
    if (layoutSetup) {
      layoutSetup.initMainLayout(config)
    }
  }, [layoutSetup, config])

  return (
    <PageDataProvider>
      <div className='app-page flex-column flex-column-fluid'>
        <Header />
        <div className='app-wrapper flex-column flex-row-fluid'>
          <div className='app-main flex-column flex-row-fluid'>
            <div className='d-flex flex-column flex-column-fluid'>
              <Toolbar />
              <Content>
                <Outlet />
              </Content>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      <ScrollTop />
    </PageDataProvider>
  )
}

export {MainLayout}
