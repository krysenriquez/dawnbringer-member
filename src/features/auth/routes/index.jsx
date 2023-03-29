import {Route, Routes, Navigate} from 'react-router-dom'
import AuthLayout from '../components/layout/AuthLayout'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import Registration from './Registration'
import ResetPassword from './ResetPassword'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<Login />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<Login />} />
        <Route path='forgot-password' element={<ForgotPassword />} />
        <Route path='reset-password/*' element={<ResetPassword />} />
        <Route path='registration/*' element={<Registration />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
