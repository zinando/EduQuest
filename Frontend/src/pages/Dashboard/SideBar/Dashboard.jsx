import './Dashboard.css'
import { Route } from 'react-router-dom';
import Home from './Home';
import Analytics from './Analytics';

function Dashboard() {
  return (
    <div className="dashboard">
      <Route path="/" exact component={Home} />
      <Route path="/analytics" component={Analytics} />
      {/* Add more Route components for different dashboard sections */}
    </div>
  );
}

export default Dashboard;


