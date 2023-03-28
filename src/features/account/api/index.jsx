import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const ACCOUNTS_URL = `${API_URL}/accounts`
export const GET_PROFILE_URL = `${ACCOUNTS_URL}/getprofile`
const UPDATE_PROFILE_URL = `${ACCOUNTS_URL}/updateprofile/`
export const GET_ADDRESS_URL = `${ACCOUNTS_URL}/getaddress/`
const CREATE_ADDRESS_URL = `${ACCOUNTS_URL}/createaddress/`
const UPDATE_ADDRESS_URL = `${ACCOUNTS_URL}/updateaddress/`
const UPDATE_DEFAULT_ADDRESS_URL = `${ACCOUNTS_URL}/updatedefaultaddress/`
const DELETE_ADDRESS_URL = `${ACCOUNTS_URL}/deleteaddress/`

const USER_URL = `${API_URL}/users`
const VERIFY_USERNAME_URL = `${USER_URL}/checkusername/`
const CHANGE_USERNAME_URL = `${USER_URL}/changeusername/`
const VERIFY_EMAIL_ADDRESS_URL = `${USER_URL}/checkemailaddress/`
const CHANGE_EMAIL_ADDRESS_URL = `${USER_URL}/changeemailaddress/`
const CHANGE_PASSWORD_URL = `${USER_URL}/changepassword/`

export const getAddress = (values) => {
  return axios
    .get(`${GET_ADDRESS_URL}`, {params: {id: values}})
    .then((d) => humps.camelizeKeys(d.data[0]))
}

export const getProfile = () => {
  return axios.get(`${GET_PROFILE_URL}`).then((d) => humps.camelizeKeys(d.data[0]))
}

export const updateAccountProfile = (values) => {
  return axios.post(`${UPDATE_PROFILE_URL}`, values, {
    headers: {'Content-Type': 'multipart/form-data'},
  })
}

export const createAddress = (values) => {
  return axios.post(`${CREATE_ADDRESS_URL}`, humps.decamelizeKeys(values))
}

export const updateAddress = (values) => {
  return axios.post(`${UPDATE_ADDRESS_URL}`, humps.decamelizeKeys(values))
}

export const updateDefaultAddress = (values) => {
  return axios.post(`${UPDATE_DEFAULT_ADDRESS_URL}`, humps.decamelizeKeys({id: values}))
}

export const deleteAddress = (values) => {
  return axios.post(`${DELETE_ADDRESS_URL}`, humps.decamelizeKeys({id: values}))
}

export const verifyUsername = (value) => {
  return axios.post(`${VERIFY_USERNAME_URL}`, {username: value})
}

export const changeUsername = (values) => {
  return axios.post(`${CHANGE_USERNAME_URL}`, humps.decamelizeKeys(values))
}

export const changeEmailAddress = (values) => {
  return axios.post(`${CHANGE_EMAIL_ADDRESS_URL}`, humps.decamelizeKeys(values))
}

export const verifyEmailAddress = (value) => {
  return axios.post(`${VERIFY_EMAIL_ADDRESS_URL}`, {email_address: value})
}

export const changePassword = (values) => {
  return axios.post(`${CHANGE_PASSWORD_URL}`, humps.decamelizeKeys(values))
}
