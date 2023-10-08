import '../Schedule/Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Card from '../../component/Card/Card'
import ReportSheet from '../../component/ReportSheet/Report';

export default function Exam() {


  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">

          <Card />
          <ReportSheet/>
        </div>
      </section>
    </>
  );
}
