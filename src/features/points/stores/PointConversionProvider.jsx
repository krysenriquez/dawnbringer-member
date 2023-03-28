import {useState, useEffect, createContext, useContext, useRef} from 'react'
import {toast} from 'react-toastify'
import {getConversionRate} from '../api'
import {getMembershipLevels} from '../../activities/api'

const PointConversionContext = createContext({
  conversionRate: undefined,
  membershipLevels: undefined,
})

const usePointConversion = () => {
  return useContext(PointConversionContext)
}

const PointConversionProvider = ({children}) => {
  const didConversionRate = useRef(false)
  const [conversionRate, setConversionRate] = useState(undefined)
  const didRequestMembershipLevels = useRef(false)
  const [membershipLevels, setMembershipLevels] = useState(undefined)

  useEffect(() => {
    const requestBranches = async () => {
      try {
        if (!didConversionRate.current) {
          const data = await getConversionRate()
          if (data) {
            setConversionRate(data.conversionRate)
          }
        }
      } catch (error) {
        if (!didConversionRate.current) {
          toast.error('Unable to fetch Conversion Rate')
        }
      }

      return () => (didConversionRate.current = true)
    }

    const requestMembershipLevels = async () => {
      try {
        if (!didRequestMembershipLevels.current) {
          const data = await getMembershipLevels()
          if (data.length > 0) {
            setMembershipLevels(data)
          }
        }
      } catch (error) {
        if (!didRequestMembershipLevels.current) {
          toast.error('Unable to fetch Membership Levels')
        }
      }

      return () => (didRequestMembershipLevels.current = true)
    }

    requestBranches()
    requestMembershipLevels()
  }, [])

  return (
    <PointConversionContext.Provider
      value={{
        conversionRate,
        membershipLevels,
      }}
    >
      {children}
    </PointConversionContext.Provider>
  )
}

export {PointConversionProvider, usePointConversion}
