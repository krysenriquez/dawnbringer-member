import {useEffect, useState} from 'react'
import CountUp from 'react-countup'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {toCurrency} from '@/utils/toCurrency'
import {CustomModal} from '@/components/elements/Modal/CustomModal'
import {
  usePointsQueryData,
  usePointsQueryLoading,
} from '@/features/points/stores/PointsQueryProvider'
import {usePointConversion} from '@/features/points/stores/PointConversionProvider'
import PointConversionForm from '@/features/points/components/ActivityConversion/ActivityConversionForm'

const ProcessPointConversion = (prop) => {
  const {isModalOpen, toggleModal} = prop

  const value = {
    isModalOpen: isModalOpen,
    toggleModal: toggleModal,
    dialogClassName: 'mw-800px',
    title: 'Convert points',
  }

  return (
    <CustomModal {...value}>
      <PointConversionForm />
    </CustomModal>
  )
}

const MembershipPoints = () => {
  const response = usePointsQueryData()
  const isLoading = usePointsQueryLoading()
  const {conversionRate} = usePointConversion()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      {response && !isLoading && (
        <div className='card card-xl-stretch mb-xl-8'>
          <div className='card-body p-0'>
            <div className='px-9 pt-7 card-rounded h-275px w-100 bg-light-primary'>
              <div className='d-flex flex-stack'>
                <h3 className='m-0 fw-bold fs-3'>Membership Points</h3>
              </div>
              <div className='row pt-8'>
                <div className='col'>
                  <div className='card flex-center p-0 bg-opacity-0'>
                    <span className='fs-4 fw-semibold text-primary pb-1 px-2'>Balance</span>
                    <span className='fs-2tx fw-bold d-flex justify-content-center'>
                      <CountUp
                        delay={0}
                        end={response.memberWallet}
                        duration={1}
                        decimals={2}
                        formattingFn={toCurrency}
                      />
                    </span>
                  </div>
                </div>
                <div className='col'>
                  <div className='card flex-center p-0 bg-opacity-0'>
                    <span className='fs-4 fw-semibold text-danger pb-1 px-2'>Cashouts</span>
                    <span className='fs-2tx fw-bold d-flex justify-content-center'>
                      <CountUp
                        delay={0}
                        end={response.cashout}
                        duration={1}
                        decimals={2}
                        formattingFn={toCurrency}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className='bg-body shadow-sm card-rounded mx-9 mb-9 px-6 py-9 position-relative z-index-1'
              style={{marginTop: '-110px'}}
            >
              {response &&
                response.membershipLevelPoints.map((points, index) => {
                  return (
                    <div className='d-flex align-items-center py-3' key={index}>
                      <div className='d-flex align-items-center flex-wrap w-100'>
                        <div className='mb-1 pe-3 flex-grow-1'>
                          <span className='fs-3 text-gray-800 fw-bold'>{points.name}</span>
                        </div>
                        <div className='d-flex align-items-center'>
                          <div className='fw-bold fs-3 text-gray-800 pe-1'>
                            <CountUp delay={0} end={points.total} duration={1} /> pt/s
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <div className='bg-body shadow-sm card-rounded mx-9 mb-9 p-0'>
              <div className='notice d-flex bg-light-warning rounded border-primary border border-dashed mt-5 p-6'>
                <CustomSVG
                  path='/media/icons/finance/wallet.svg'
                  className='svg-icon svg-icon-2tx svg-icon-warning me-4'
                />
                <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
                  <div className='mb-3 mb-md-0 fw-semibold'>
                    <h4 className='text-gray-900 fw-bold'>
                      Convertion Rate: 1 point to {toCurrency(conversionRate)}
                    </h4>
                    <div className='fs-6 text-gray-700 pe-7'>
                      Conversion Rate may be subject to change.
                    </div>
                  </div>
                  <button
                    className='btn btn-light-warning px-6 align-self-center text-nowrap'
                    onClick={toggleModal}
                  >
                    Convert Points
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isModalOpen && (
        <ProcessPointConversion isModalOpen={isModalOpen} toggleModal={toggleModal} />
      )}
    </>
  )
}

export default MembershipPoints
