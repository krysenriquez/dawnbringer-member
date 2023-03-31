import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const API_SUFFIX = import.meta.env.VITE_API_SUFFIX
const AUTH_URL = `${API_URL}/vanguard/${API_SUFFIX}`
const ACCOUNTS_URL = `${API_URL}/accounts/${API_SUFFIX}`
const USERS_URL = `${API_URL}/users/${API_SUFFIX}`

const LOGIN_URL = `${AUTH_URL}/login/`
const GET_USER_BY_ACCESSTOKEN_URL = `${AUTH_URL}/whoami/`
const REFRESH_URL = `${AUTH_URL}/refresh/`
const FORGOT_PASSWORD_URL = `${AUTH_URL}/forgotpassword/`
const VERIFY_FORGOT_PASSWORD_URL = `${AUTH_URL}/verifyforgotpassword/`
const VERIFY_REGISTRATION_URL = `${ACCOUNTS_URL}/verifyregistration/`
const REGISTER_ACCOUNT_URL = `${ACCOUNTS_URL}/register/`
const GET_ACCOUNT_URL = `${ACCOUNTS_URL}/getaccount`

const RESET_PASSWORD_URL = `${USERS_URL}/resetpassword/`
const CHECK_USERNAME_URL = `${USERS_URL}/checkusername/`
const CHECK_EMAIL_URL = `${USERS_URL}/checkemailaddress/`

export function login(username, password) {
  return axios.post(LOGIN_URL, {username, password})
}

export function getUserByToken(token) {
  return axios.post(`${GET_USER_BY_ACCESSTOKEN_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function refreshToken(refresh) {
  return axios.post(`${REFRESH_URL}`, {
    refresh,
  })
}

export function requestResetPassword(values) {
  return axios.post(`${FORGOT_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

export function verifyForgotPassword(values) {
  return axios
    .post(`${VERIFY_FORGOT_PASSWORD_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export function verifyRegistration(values) {
  return axios
    .post(`${VERIFY_REGISTRATION_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export function registerAccount(values) {
  return axios.post(`${REGISTER_ACCOUNT_URL}`, humps.decamelizeKeys(values))
}

export function getAccount() {
  return axios.get(`${GET_ACCOUNT_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function resetPassword(values, token) {
  let config = {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  }
  return axios.post(`${RESET_PASSWORD_URL}`, humps.decamelizeKeys(values), config)
}

export const checkUsername = (value) => {
  return axios.post(`${CHECK_USERNAME_URL}`, {username: value})
}

export const checkEmailAddress = (value) => {
  return axios.post(`${CHECK_EMAIL_URL}`, {email_address: value})
}
