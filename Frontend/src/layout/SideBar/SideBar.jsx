import './SideBar.css'



export default function SideBar() {
  return (
    <>
      <>
        <div className="wrapper">
          <input type="checkbox" id="btn" hidden="" />
          <label htmlFor="btn" className="menu-btn">
            <i className="fas fa-bars" />
            <i className="fas fa-times" />
          </label>
          <nav id="sidebar">
            <div className="title">Side Menu</div>
            <ul className="list-items">
              <li>
                <a href="#">
                  <i className="fas fa-home" />
                  Home
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-sliders-h" />
                  Clients
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-address-book" />
                  Services
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-cog" />
                  Settings
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-stream" />
                  Features
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-user" />
                  About us
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-globe-asia" />
                  Languages
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-envelope" />
                  Contact us
                </a>
              </li>
              <div className="icons">
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-github" />
                </a>
                <a href="#">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </ul>
          </nav>
        </div>
        <div className="content">
          <div className="header">Animated Side Navigation Menu</div>
          <p>using only HTML and CSS</p>
        </div>
      </>

    
    </>
  )
}