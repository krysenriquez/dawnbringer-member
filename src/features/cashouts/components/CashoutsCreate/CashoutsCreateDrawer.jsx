import {useState} from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import {CashoutCreateProvider} from '@/features/cashouts/stores/CashoutCreateProvider'
import CashoutsCreateForm from './CashoutsCreateForm'

const CashoutsCreateDrawer = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <div
        className='engage-toolbar d-flex position-fixed px-5 fw-bolder zindex-2 top-50 end-0 transform-90 mt-n20 gap-2'
        onClick={handleShow}
      >
        <button
          id='kt_engage_demos_toggle'
          className='engage-demos-toggle btn btn-flex h-35px bg-body btn-light-warning shadow-sm fs-6 px-4 rounded-top-0'
        >
          <span>Cashout</span>
        </button>
      </div>
      <Offcanvas show={show} onHide={handleClose} placement='end'>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Request Cashout</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <CashoutCreateProvider>
            <CashoutsCreateForm />
          </CashoutCreateProvider>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default CashoutsCreateDrawer
