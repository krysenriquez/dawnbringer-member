import CustomSVG from '@/components/elements/SVG/CustomSVG'
import {toCurrency} from '@/utils/toCurrency'
import {useAccount} from '@/providers/AccountProvider'
import {QRCodeSVG} from 'qrcode.react'
import {toAbsoluteUrl} from '@/utils/toAbsoluteUrl'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

const Code = () => {
  const {currentAccount} = useAccount()
  const [referralLink, setReferralLink] = useState(undefined)

  useEffect(() => {
    if (currentAccount) {
      setReferralLink(`https://lereussicakes.com/?code=` + currentAccount.accountCode)
    }
  }, [currentAccount])

  const copyToClipBoard = () => {
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
                  value={referralLink}
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
                      defaultValue={referralLink}
                    />
                    <button
                      className='btn btn-light btn-active-light-primary fw-bold flex-shrink-0'
                      onClick={() => copyToClipBoard()}
                    >
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='card card-dashed flex-center min-w-175px my-3 p-6'>
                  <span className='fs-4 fw-semibold text-secondary pb-1 px-2'>Bronze</span>
                  <span className='fs-lg-2tx fw-bold d-flex justify-content-center'>
                    <span
                      data-countup='true'
                      data-countup-value='40.00'
                      className='counted'
                      data-initialized={1}
                    >
                      40
                    </span>
                  </span>
                </div>
              </div>
              <div className='col'>
                <div className='card card-dashed flex-center min-w-175px my-3 p-6'>
                  <span className='fs-4 fw-semibold text-gray-700 pb-1 px-2'>Silver</span>
                  <span className='fs-lg-2tx fw-bold d-flex justify-content-center'>
                    <span
                      data-countup='true'
                      data-countup-value='40.00'
                      className='counted'
                      data-initialized={1}
                    >
                      40
                    </span>
                  </span>
                </div>
              </div>
              <div className='col'>
                <div className='card card-dashed flex-center min-w-175px my-3 p-6'>
                  <span className='fs-4 fw-semibold text-warning pb-1 px-2'>Gold</span>
                  <span className='fs-lg-2tx fw-bold d-flex justify-content-center'>
                    <span
                      data-countup='true'
                      data-countup-value='60'
                      className='counted'
                      data-initialized={1}
                    >
                      60
                    </span>
                  </span>
                </div>
              </div>
              <div className='col'>
                <div className='card card-dashed flex-center min-w-175px my-3 p-6'>
                  <span className='fs-4 fw-semibold text-white pb-1 px-2'>Diamond</span>
                  <span className='fs-lg-2tx fw-bold d-flex justify-content-center'>
                    <span
                      data-countup='true'
                      data-countup-value='85"'
                      className='counted'
                      data-initialized={1}
                    >
                      85
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className='notice d-flex bg-light-primary rounded border-primary border border-dashed mt-5 p-6'>
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Code
