import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL

const AUTH_URL = `${API_URL}/vanguard`
const GET_USER_BY_ACCESSTOKEN_URL = `${AUTH_URL}/whoami/`
const LOGIN_URL = `${AUTH_URL}/login/`
const REFRESH_URL = `${AUTH_URL}/refresh/`

const REQUEST_RESET_PASSWORD_URL = `${AUTH_URL}/requestresetpassword/`

const CORE_URL = `${API_URL}/core`
const VERIFY_CODE_URL = `${CORE_URL}/verifycode/`

const ACCOUNTS_URL = `${API_URL}/accounts`
const VERIFY_REGISTRATION_URL = `${ACCOUNTS_URL}/verifyregistration/`
const REGISTER_ACCOUNT_URL = `${ACCOUNTS_URL}/register/`
const GET_ACCOUNTS_URL = `${ACCOUNTS_URL}/getaccount`

const USER_URL = `${API_URL}/users`
const RESET_PASSWORD_URL = `${USER_URL}/resetpassword/`
const VERIFY_USERNAME_URL = `${USER_URL}/checkusername/`
const VERIFY_EMAIL_URL = `${USER_URL}/checkemailaddress/`

export function login(username, password) {
  return axios.post(LOGIN_URL, {username, password})
}

export function refreshToken(refresh) {
  return axios.post(`${REFRESH_URL}`, {
    refresh,
  })
}

export function verifyRegistration(values) {
  return axios
    .post(`${VERIFY_REGISTRATION_URL}`, humps.decamelizeKeys(values))
    .then((d) => humps.camelizeKeys(d.data))
}

export function registerAccount(values) {
  return axios.post(`${REGISTER_ACCOUNT_URL}`, humps.decamelizeKeys(values))
}

export const verifyUsername = (value) => {
  return axios.post(`${VERIFY_USERNAME_URL}`, {username: value})
}

export const verifyEmailAddress = (value) => {
  return axios.post(`${VERIFY_EMAIL_URL}`, {email_address: value})
}

export function requestResetPassword(values) {
  return axios.post(`${REQUEST_RESET_PASSWORD_URL}`, humps.decamelizeKeys(values))
}

export function verifyResetPassword(values) {
  return axios
    .get(`${REQUEST_RESET_PASSWORD_URL}`, {params: humps.decamelizeKeys(values)})
    .then((d) => humps.camelizeKeys(d.data))
}

export function resetPassword(values, token) {
  let config = {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  }
  return axios.post(`${RESET_PASSWORD_URL}`, humps.decamelizeKeys(values), config)
}

export function getUserByToken(token) {
  return axios.post(`${GET_USER_BY_ACCESSTOKEN_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export function verifycode(values) {
  return axios.post(VERIFY_CODE_URL, humps.decamelizeKeys(values))
}

export function getAccount() {
  return axios.get(`${GET_ACCOUNTS_URL}`).then((d) => humps.camelizeKeys(d.data))
}
