import {Route, Routes, Navigate} from 'react-router-dom'
import {AuthLayout} from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'
import ForgotPasswordForm from '../components/ForgotPasswordForm'
import Registration from './Registration'
import ResetPassword from './ResetPassword'

const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<LoginForm />} />
        <Route path='forgot-password' element={<ForgotPasswordForm />} />
        <Route path='reset-password/*' element={<ResetPassword />} />
        <Route path='registration/*' element={<Registration />} />
      </Route>
    </Routes>
  )
}

export default AuthRoutes
