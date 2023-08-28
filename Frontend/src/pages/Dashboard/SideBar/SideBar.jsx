import './SideBar.css'
import { Link } from 'react-router-dom';


export default function SideBar() {
  return (
  
      <>
      <div className="sidebar">
        <Link to="/SignUp" className='logo'><h2>Edu<span className='quest'>Quest</span><span className='yellow'>.</span></h2></Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          <li>
            <Link to="/analytics">Analytics</Link>
          </li>
          {/* Add more sidebar navigation items */}
        </ul>
      </div>
      </>

    
   
  )
}