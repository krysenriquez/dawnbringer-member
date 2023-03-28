import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const CORE_URL = `${API_URL}/core`

export const GET_ACTIVITIES_URL = `${CORE_URL}/getmemberactivities/`
const GET_MEMBERSHIP_LEVELS_URL = `${CORE_URL}/getmembershiplevels/`

export const getActivities = () => {
  return axios.get(`${GET_ACTIVITIES_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getMembershipLevels = () => {
  return axios.get(`${GET_MEMBERSHIP_LEVELS_URL}`).then((d) => humps.camelizeKeys(d.data))
}
