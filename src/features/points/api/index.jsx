import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_MEMBERSHIP_LEVEL_POINTS = `${CORE_URL}/getmembershiplevelpoints/`
const GET_CONVERSION_RATE = `${CORE_URL}/getconversionrate/`
const GET_MAX_CONVERSION_AMOUNT = `${CORE_URL}/checkmaxconversionamount/`
const CREATE_POINT_CONVERSION = `${CORE_URL}/convertpoints/`

export const getMembershipLevelPoints = (values) => {
  return axios.post(`${GET_MEMBERSHIP_LEVEL_POINTS}`).then((d) => humps.camelizeKeys(d.data))
}

export const getConversionRate = () => {
  return axios.post(`${GET_CONVERSION_RATE}`).then((d) => humps.camelizeKeys(d.data))
}

export const getMaxConversionAmount = (values) => {
  return axios
    .post(`${GET_MAX_CONVERSION_AMOUNT}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const createPointConversion = (values) => {
  return axios.post(`${CREATE_POINT_CONVERSION}`, humps.decamelizeKeys(values))
}
