import {useState} from 'react'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
  useProfileInfoQueryData,
  useProfileInfoQueryLoading,
  useProfileInfoQueryContext,
} from '../../stores/ProfileInfoQueryProvider'
import {useGlobalState} from '@/providers/GlobalStateProvider'
import {AddressInfoQueryProvider} from '../../stores/AddressInfoQueryProvider'
import {updateDefaultAddress, deleteAddress} from '../../api'
import CustomCard from '@/components/elements/Card/CustomCard'
import {CustomAccordionToggle} from '@/components/elements/Accordion/CustomAccordion'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import Accordion from 'react-bootstrap/Accordion'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import ActionCell from '@/components/elements/Table/Cell/ActionCell'

import CreateAddressForm from './Form/CreateAddressForm'
import EditAddressForm from './Form/EditAddressForm'

const ProcessAddAddress = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Add New Address',
  }

  return (
    <CustomModal {...value}>
      <CreateAddressForm />
    </CustomModal>
  )
}

const ProcessEditAddress = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-600px',
    title: 'Update Address',
  }

  return (
    <CustomModal {...value}>
      <AddressInfoQueryProvider>
        <EditAddressForm />
      </AddressInfoQueryProvider>
    </CustomModal>
  )
}

const AddressInfo = () => {
  const swal = withReactContent(Swal)
  const profileInfo = useProfileInfoQueryData()
  const isLoading = useProfileInfoQueryLoading()
  const {refetch} = useProfileInfoQueryContext()
  const {setParam} = useGlobalState()
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false)
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)

  const addAddress = () => {
    setIsModalCreateOpen(!isModalCreateOpen)
  }

  const editAddress = (id) => {
    setParam(id)
    setIsModalEditOpen(!isModalEditOpen)
  }

  const setDefaultAddressPrompt = (id) => {
    swal
      .fire({
        title: 'Set Default Address?',
        icon: 'question',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Confirm',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const {data: response} = await updateDefaultAddress(id)
            swal.fire('Address Defaulted!', response.detail, 'success')
            console.log()
          } catch (ex) {
            toast.error(ex.detail)
          }
        }
      })
      .finally(() => {
        refetch()
      })
  }

  const deleteAddressPrompt = (id) => {
    swal
      .fire({
        title: 'Delete Address?',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: 'btn btn-primary',
        cancelButtonColor: 'btn btn-info',
        confirmButtonText: 'Confirm',
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const {data: response} = await deleteAddress(id)
            swal.fire('Address Deleted!', response.detail, 'success')
            console.log()
          } catch (ex) {
            toast.error(ex.detail)
          }
        }
      })
      .finally(() => {
        refetch()
      })
  }

  return (
    <>
      {profileInfo && !isLoading ? (
        <CustomCard
          cardClassName='card-flush mb-5 mb-xl-8'
          hasHeader={true}
          header={<h2>Address Book</h2>}
          bodyClassName='pt-0'
          hasToolbar={true}
          toolbarButtonName='Add New Address'
          toolbarButtonClassName='btn btn-light-primary'
          handleToolbarButtonClick={addAddress}
        >
          <>
            <Accordion>
              {profileInfo.addressInfo &&
                profileInfo.addressInfo.map((address, index) => {
                  return (
                    <div className='py-0' key={index}>
                      <div className='py-3 d-flex flex-stack flex-wrap'>
                        <CustomAccordionToggle eventKey='0' className='cursor-pointer'>
                          <div className='d-flex align-items-center collapsible rotate collapsed'>
                            <button className='btn btn-flush me-3 rotate-90'>
                              <CustomSVG
                                path='/media/icons/arrows/caret-right.svg'
                                className='svg-icon-2'
                              />
                            </button>
                            <div className='me-3'>
                              <div className='d-flex align-items-center'>
                                <div className='fs-4 fw-bold'>{address.label}</div>
                                {address.isDefault && (
                                  <div className='badge badge-light-primary ms-5'>Default</div>
                                )}
                              </div>
                              <div className='text-muted'>{address.address1}</div>
                            </div>
                          </div>
                        </CustomAccordionToggle>
                        <div className='d-flex my-3 ms-9'>
                          <ActionCell
                            handleClick={() => editAddress(address.id)}
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto me-3'
                          >
                            <CustomSVG
                              path='/media/icons/actions/write.svg'
                              className='svg-icon-2'
                            />
                          </ActionCell>
                          <ActionCell
                            handleClick={() => setDefaultAddressPrompt(address.id)}
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto me-3'
                          >
                            <CustomSVG
                              path='/media/icons/general/gear.svg'
                              className='svg-icon-2'
                            />
                          </ActionCell>
                          <ActionCell
                            handleClick={() => deleteAddressPrompt(address.id)}
                            className='btn btn-icon btn-active-light-primary w-30px h-30px ms-auto me-3'
                          >
                            <CustomSVG
                              path='/media/icons/actions/delete.svg'
                              className='svg-icon-2'
                            />
                          </ActionCell>
                        </div>
                      </div>
                      <Accordion.Collapse eventKey='0'>
                        <div className='fs-6 ps-9 collapse show'>
                          <div className='d-flex flex-column pb-5'>
                            <div className='text-muted'>
                              {[address.address1, address.address2].join(', ')}
                              <br />
                              {[address.city, address.province, address.zip].join(', ')}
                              <br />
                              {address.country}
                            </div>
                          </div>
                        </div>
                      </Accordion.Collapse>
                    </div>
                  )
                })}
            </Accordion>
          </>
        </CustomCard>
      ) : (
        <></>
      )}
      {isModalCreateOpen && (
        <ProcessAddAddress isModalOpen={isModalCreateOpen} toggleModal={addAddress} />
      )}
      {isModalEditOpen && (
        <ProcessEditAddress isModalOpen={isModalEditOpen} toggleModal={editAddress} />
      )}
    </>
  )
}

export default AddressInfo
