import '../../layout/Sidebar/SideBar.css'
import Sidebar from '../../layout/Sidebar/SideBar'
import Navbar from '../../layout/Navbar/NavBar'
import Timetable from '../../component/Timetable/Timetable'




export default function Classes() {
  return (
    <>
      <Sidebar />

      <section className="home-section">
        <Navbar />
        <div className="home-content">
          
          <Timetable/>
        </div>
      </section>
    </>
  )
}

