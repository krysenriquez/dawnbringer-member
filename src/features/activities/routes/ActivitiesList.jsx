import {ActivitiesListQueryProvider} from '../stores/ActivitiesListQueryProvider'
import ActivitiesListTable from '../components/ActivitiesList/ActivitiesListTable'

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
