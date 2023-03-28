import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ORDERS_URL = `${API_URL}/orders
`
export const GET_REFERRALS_URL = `${ORDERS_URL}/getreferralorders/`

export const getReferrals = () => {
  return axios.get(`${GET_REFERRALS_URL}`).then((d) => humps.camelizeKeys(d.data))
}
