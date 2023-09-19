import '../../layout/Sidebar/SideBar.css'
import Sidebar from '../../layout/Sidebar/SideBar'
import Navbar from '../../layout/Navbar/NavBar'
import Calendar from '../../component/Calendar/Calendar'




export default function Subject() {
  return (
    <>
      <Sidebar />

      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <Calendar />

        </div>
      </section>
    </>
  )
}

