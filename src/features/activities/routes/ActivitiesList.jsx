import {ActivitiesListQueryProvider} from '../stores/ActivitiesListQueryProvider'
import ActivitiesListTable from '../components/OrdersList/ActivitiesListTable'

const ActivitiesList = () => {
  return (
    <>
      <ActivitiesListQueryProvider>
        <ActivitiesListTable />
      </ActivitiesListQueryProvider>
    </>
  )
}

export default ActivitiesList
