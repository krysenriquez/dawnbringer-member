import {Fragment} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLayout} from '@/providers/layout/LayoutProvider'
import {usePageData} from '@/providers/PageDataProvider'

const DefaultTitle = () => {
  const {pageTitle, pageDescription, pageBreadcrumbs} = usePageData()
  const {config, classes} = useLayout()

  return (
    <div className={clsx('page-title d-flex flex-column me-3', classes.pageTitle.join(' '))}>
      {pageTitle && <h1 className='d-flex text-white fw-bold my-1 fs-3'>{pageTitle}</h1>}
      {pageBreadcrumbs &&
        pageBreadcrumbs.length > 0 &&
        config.app.pageTitle &&
        config.app.pageTitle.breadCrumbs && (
          <>
            <ul className='breadcrumb breadcrumb-separatorless fw-bold fs-7 my-1'>
              {Array.from(pageBreadcrumbs).map((item, index) => (
                <Fragment key={`${item.path}${index}`}>
                  {item.isSeparator ? (
                    <li className='breadcrumb-item'>
                      <span className='bullet bg-gray-200 w-5px h-2px'></span>
                    </li>
                  ) : (
                    <>
                      {item.isActive ? (
                        <li className='breadcrumb-item text-dark'>{item.title}</li>
                      ) : (
                        <li className='breadcrumb-item text-primary'>
                          <Link to={item.path} className='text-primary text-hover-primary'>
                            {item.title}
                          </Link>
                        </li>
                      )}
                    </>
                  )}
                </Fragment>
              ))}
              <li className='breadcrumb-item text-dark'>{pageTitle}</li>
            </ul>
          </>
        )}
    </div>
  )
}

export default DefaultTitle
