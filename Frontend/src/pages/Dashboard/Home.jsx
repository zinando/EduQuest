import SideBar from '../../layout/Sidebar/SideBar';
import './Home.css';

export default function Home() {
  return (
    <div className="hm-container">
      <SideBar />
      <div className="home-container">
        <h1 className="home-header">Welcome to the Dashboard Home Page</h1>
        <p>This is the main overview of your dashboard.</p>
        <div className="data-summary">
          <h2>Data Summary</h2>
          <p>Here&apos;s a quick summary of your data:</p>
          <ul>
            <li>Total Users: 1000</li>
            <li>Total Orders: 500</li>
            <li>Revenue: $50,000</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
