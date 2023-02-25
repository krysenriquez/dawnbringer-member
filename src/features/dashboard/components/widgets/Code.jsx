import clsx from 'clsx'
import CountUp from 'react-countup'
import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {toCurrency} from '@/utils/toCurrency'
import {useAccount} from '@/providers/AccountProvider'
import {QRCodeSVG} from 'qrcode.react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

const Code = () => {
  const {currentAccount} = useAccount()

  const copyToClipBoard = (referralLink) => {
    navigator.clipboard.writeText(referralLink)
    toast.success('Link Copied!')
  }

  return (
    <>
      {currentAccount && (
        <div className='card mb-5 mb-xl-10'>
          <div className='card-body py-10'>
            <div className='row'>
              <div className='col-xl-6 col-12 text-center mb-10'>
                <QRCodeSVG
                  value={currentAccount.code.referralLink}
                  size={180}
                  bgColor={'#ffffff'}
                  fgColor={'#000000'}
                  level={'H'}
                  includeMargin={false}
                  imageSettings={{
                    src: toAbsoluteUrl('/media/logos/logo.png'),
                    x: undefined,
                    y: undefined,
                    height: 50,
                    width: 50,
                    excavate: true,
                  }}
                />
              </div>
              <div className='col-xl-6 col-12 d-flex flex-wrap align-items-center mb-10'>
                <div>
                  <h4 className='text-gray-800 mb-0'>Your Referral Link</h4>
                  <p className='fs-6 fw-semibold text-gray-600 py-4 m-0'>
                    Get product discounts and earn by sharing your QR Code or Referral Link
                  </p>
                  <div className='d-flex'>
                    <input
                      id='kt_referral_link_input'
                      type='text'
                      className='form-control form-control-solid me-3 flex-grow-1'
                      name='search'
                      defaultValue={currentAccount.code.referralLink}
                    />
                    <button
                      className='btn btn-light btn-active-light-primary fw-bold flex-shrink-0'
                      onClick={() => copyToClipBoard(currentAccount.code.referralLink)}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              {currentAccount.membershipLevelPoints &&
                currentAccount.membershipLevelPoints.map((points, index) => {
                  return (
                    <div className='col' key={index}>
                      <div className='card card-dashed flex-center min-w-175px my-3 p-6'>
                        <span
                          className={clsx('fs-4 fw-semibold pb-1 px-2', {
                            'text-secondary': points.membershipLevel == 'Bronze',
                            'text-gray-700': points.membershipLevel == 'Silver',
                            'text-warning': points.membershipLevel == 'Gold',
                            'text-white': points.membershipLevel == 'Diamond',
                          })}
                        >
                          {points.membershipLevel}
                        </span>
                        <span className='fs-lg-2tx fw-bold d-flex justify-content-center'>
                          <CountUp delay={0} end={points.totalPoints} duration={1} />
                        </span>
                      </div>
                    </div>
                  )
                })}
            </div>
            {/* <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed mt-5 p-6'>
              <CustomSVG
                path='/media/icons/finance/wallet.svg'
                className='svg-icon svg-icon-2tx svg-icon-primary me-4'
              />
              <div className='d-flex flex-stack flex-grow-1 flex-wrap flex-md-nowrap'>
                <div className='mb-3 mb-md-0 fw-semibold'>
                  <h4 className='text-gray-900 fw-bold'>Convert your Earned Points</h4>
                  <div className='fs-6 text-gray-700 pe-7'>
                    Convert your earned points to your wallet. With a conversion rate of 1 point to{' '}
                    {toCurrency(1)}
                  </div>
                </div>
                <a href='#' className='btn btn-primary px-6 align-self-center text-nowrap'>
                  Convert Points
                </a>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}

export default Code
