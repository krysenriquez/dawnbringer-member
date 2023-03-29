import {ResetPasswordProvider} from '../stores/ResetPasswordProvider'
import ResetPasswordForm from '../components/ResetPasswordForm'

const ResetPassword = () => {
  return (
    <ResetPasswordProvider>
      <ResetPasswordForm />
    </ResetPasswordProvider>
  )
}

export default ResetPassword
