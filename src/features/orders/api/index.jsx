import axios from 'axios'
import humps from 'humps'

const API_URL = import.meta.env.VITE_API_URL
const ORDERS_URL = `${API_URL}/orders
`
export const GET_ORDERS_URL = `${ORDERS_URL}/getorders`
export const GET_ORDER_INFO_URL = `${ORDERS_URL}/getorder`

export const getOrders = () => {
  return axios.get(`${GET_ORDERS_URL}`).then((d) => humps.camelizeKeys(d.data))
}

export const getOrderInfo = (orderId) => {
  return axios
    .get(
      `${GET_ORDER_INFO_URL}`,
      humps.decamelizeKeys({
        params: {
          orderId: orderId,
        },
      })
    )
    .then((d) => humps.camelizeKeys(d.data[0]))
}
