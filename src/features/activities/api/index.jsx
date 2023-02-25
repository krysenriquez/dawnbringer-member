import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ORDERS_URL = `${API_URL}/core
`
export const GET_ACTIVITIES_URL = `${ORDERS_URL}/getmemberactivities/`

export const getActivities = () => {
  return axios.get(`${GET_ACTIVITIES_URL}`).then((d) => humps.camelizeKeys(d.data))
}
