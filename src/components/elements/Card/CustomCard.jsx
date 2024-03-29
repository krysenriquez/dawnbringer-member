import clsx from 'clsx'

const CustomCard = (props) => {
  const {
    cardClassName,
    hasHeader = false,
    headerClassName,
    header,
    hasToolbar,
    toolbarButtonName,
    toolbarButtonClassName,
    handleToolbarButtonClick,
    bodyClassName,
    children,
  } = props

  return (
    <div className={clsx('card', cardClassName && cardClassName)}>
      {hasHeader && (
        <div className={clsx('card-header', headerClassName && headerClassName)}>
          {header && <div className='card-title'>{header}</div>}
          {hasToolbar && (
            <div className='card-toolbar'>
              <button
                className={toolbarButtonClassName && toolbarButtonClassName}
                onClick={handleToolbarButtonClick}
              >
                {toolbarButtonName}
              </button>
            </div>
          )}
        </div>
      )}
      <div className={clsx('card-body', bodyClassName && bodyClassName)}>{children}</div>
    </div>
  )
}

export default CustomCard
