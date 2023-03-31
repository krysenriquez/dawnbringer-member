import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX

const ACCOUNTS_URL = `${API_URL}/accounts/${API_SUFFIX}`
export const GET_ACCOUNT_CASHOUT_METHODS_URL = `${ACCOUNTS_URL}/getaccountcashoutmethods/`

const CORE_URL = `${API_URL}/core/${API_SUFFIX}`
export const GET_CASHOUTS_URL = `${CORE_URL}/getcashouts`
export const GET_CASHOUT_INFO_URL = `${CORE_URL}/getcashoutinfo`
const GET_DEFAULT_CASHOUT_METHODS_URL = `${CORE_URL}/getdefaultcashoutmethods/`
const GET_WALLET_CAN_CASHOUT_URL = `${CORE_URL}/getwalletcancashout/`
const GET_WALLET_CASHOUT_SCHEDULES_URL = `${CORE_URL}/getwalletcashoutschedules/`
const GET_WALLET_MAX_CASHOUT_URL = `${CORE_URL}/getwalletmaxcashout/`
const GET_WALLET_TOTAL_CASHOUT_URL = `${CORE_URL}/getwallettotalcashout/`
const GET_WALLET_TOTAL_FEE_URL = `${CORE_URL}/getwallettotalfee/`
const CREATE_CASHOUT_REQUEST_URL = `${CORE_URL}/requestcashout/`

export const getAccountCashoutMethods = () => {
  return axios.get(`${GET_ACCOUNT_CASHOUT_METHODS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getCashouts = (accountId) => {
  return axios
    .get(`${GET_CASHOUTS_URL}`, {params: {account_id: accountId}})
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCashout = (values) => {
  return axios
    .get(`${GET_CASHOUT_INFO_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getCashoutMethods = () => {
  return axios.get(`${GET_DEFAULT_CASHOUT_METHODS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getWalletCanCashout = (values) => {
  return axios.post(`${GET_WALLET_CAN_CASHOUT_URL}`, humps.decamelizeKeys(values))
}

export const getWalletCashoutSchedules = () => {
  return axios.post(`${GET_WALLET_CASHOUT_SCHEDULES_URL}`)
}

export const getWalletMaxCashout = (values) => {
  return axios.post(`${GET_WALLET_MAX_CASHOUT_URL}`, humps.decamelizeKeys(values))
}

export const getWalletTotalCashout = (values) => {
  return axios
    .post(`${GET_WALLET_TOTAL_CASHOUT_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export const getCashoutTotalFee = () => {
  return axios.post(`${GET_WALLET_TOTAL_FEE_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const requestCashout = (values) => {
  return axios.post(`${CREATE_CASHOUT_REQUEST_URL}`, humps.decamelizeKeys(values))
}
