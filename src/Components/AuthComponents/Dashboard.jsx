import DiaperStats from './DiaperStats';
import GrowthStats from './SleepStats';
import FoodStats from './SleepStats';
import SleepStats from './SleepStats';
import {
     Row,
} from 'reactstrap'

// What Dashboard will do:
// provide the opportunity to acquire the logged-in user's children from a drop-down
// A selection from the drop-down will set the state variables for the child


const Dashboard = () => {

     // In case I need to move things back:
     // useEffect(() => {
     //      fetchChildren();
     // }, [createChild])

     return(
          <div>
               <Row className="dashboard">
                    <h1>Dashboard screen</h1>
               </Row>
               <Row className="dashboard-stat">
                    <SleepStats />
               </Row>
               <Row className="dashboard-stat">
                    <FoodStats />
               </Row>
               <Row className="dashboard-stat">
                    <DiaperStats />
               </Row>
               <Row className="dashboard-stat">
                    <GrowthStats />
               </Row>
          </div>
     )
}

export default Dashboard;