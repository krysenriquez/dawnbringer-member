import RegistrationForm from '../components/RegistrationForm'
import {RegistrationProvider} from '../stores/RegistrationProvider'

const Registration = () => {
  return (
    <RegistrationProvider>
      <RegistrationForm />
    </RegistrationProvider>
  )
}

export default Registration
