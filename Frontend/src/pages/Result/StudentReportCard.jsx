import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {Button, Table, Row, Col, Modal, Form } from 'react-bootstrap';
import * as Unicons from '@iconscout/react-unicons';
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import icons from '../../assets/logo.svg'
import '../Dashboard/Home.css';
import triggerProcessing, { showToast } from '../triggerProcessing';
import queryBackEnd, { userInfo, isObjectEmpty, checkUserPermission, logOutUser } from '../queryBackEnd';
import Container from 'react-bootstrap/Container';
import LogoCard from '../../component/Card/LogoCard'

export default function StudentReportCard() {
    const [logoArea, setLogoArea] = useState(
        [{width: 2, type: "image", src: icons,},{width: 2,type: "text",text: "EDUQUEST",}]
    );
    const [params] = useSearchParams();
    const [resultStat, setResultStat] = useState({});
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        fetchStudentResult();
    }, []);

    const fetchStudentResult = () => {
        const url = '/dashboard/'+ userInfo().adminType;
        const action = 'FETCH-RESULT';
        const data = {};
        data.examina_id = params.get('examinaId');
        data.user_id = params.get('userId');
        const method = 'POST';
        let myStat = resultStat;
        let myData = resultData;

        // Fetch data from the backend
        queryBackEnd(url, data, action, method)
          .then((response) => {
                if (response.status === 1){
                myData = response.data.result_data;
                myStat = response.data.stat;
            }
            setResultData(myData);
            setResultStat(myStat);
          })
          .catch((error) => console.error(error));
    }

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <LogoCard stat={resultStat} content={resultData} />
        </div>
      </section>
    </>
  );
}
