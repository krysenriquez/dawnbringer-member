import {createContext, useContext, useEffect, useState, Children} from 'react'
import Accordion from 'react-bootstrap/Accordion'
import {useAccordionButton} from 'react-bootstrap/AccordionButton'

const CustomAccordionToggle = (props) => {
  const {className, children, eventKey, callback} = props

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    console.log(eventKey)
    callback && callback(eventKey)
  })

  return <div onClick={decoratedOnClick}>{children}</div>
}

const CustomAccordion = (props) => {
  const {className, defaultActiveKey, children} = props

  useEffect(() => {
    if (children) {
      Children.map(children, (child, index) => {
        console.log(child)
      })
    }
  }, [children])

  return (
    <Accordion defaultActiveKey='0' className={className}>
      {/* <CustomAccordionToggle eventKey='0'>Click me!</CustomAccordionToggle>
      <Accordion.Collapse eventKey='0'>
        <div>Hello! I'm the body</div>
      </Accordion.Collapse> */}
      {children}
    </Accordion>
  )
}

export {CustomAccordion, CustomAccordionToggle}
