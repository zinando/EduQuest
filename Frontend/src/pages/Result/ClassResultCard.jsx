import { useState, useEffect } from 'react';
import '../Schedule/Schedule.css'
import '../../layout/Sidebar/SideBar.css';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import Card from '../../component/Card/ClassResultStatCard';
import queryBackEnd, { userInfo, isObjectEmpty } from '../../pages/queryBackEnd';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {Row, Col, Container, Table} from 'react-bootstrap';

export default function ClassResultCard() {
    const [classStatistics, setClassStatistics] = useState(0);
    const [resultStat, setResultStat] = useState({});
    const [resultData, setResultData] = useState([]);
    const [params] = useSearchParams();

useEffect(() => {
    fetchClassResult(params.get("classId"));
}, []);

const fetchClassResult = (classId) => {
    const url = '/dashboard/'+ userInfo().adminType;
    const action = 'FETCH-CLASS-RESULT';
    const data = {};
    if (classId === null)
    {data.class_id = 0;data.examina_id = 0;}
    else{data.class_id = parseInt(params.get('classId')); data.examina_id = parseInt(params.get('examinaId'))};
    const method = 'POST';
    let myStat = classStatistics;
    let myData = resultData;

    // Fetch data from the backend
    queryBackEnd(url, data, action, method)
      .then((response) => {
            if (response.status === 1){
            myData = response.data;
            myStat = response.stat;
        }
        setResultData(myData);
        setClassStatistics(myStat);
      })
      .catch((error) => console.error(error));
};

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <Card cardItems={classStatistics} />

          <div className="d-flex justify-content-center">
            {resultData.length > 0 && (
            <Table className="custom-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Student Name</th>
                        <th>Class</th>
                        <th>Score</th>
                        <th>Remarks</th>
                    {userInfo().adminType!="student" && (
                        <th>Action</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                {resultData.map((item, index) => (
                    <tr key={index}>
                        <td>{item.stat.class_rank}</td>
                        <td>{item.stat.student_name}</td>
                        <td>{item.stat.student_class}</td>
                        <td>{item.stat.average_score.toFixed(2)}%</td>
                        <td>{item.stat.remarks}</td>
                        <td>
                        {userInfo().adminType!="student" && (
                            <a href={`/report_card?examinaId=${item.stat.examina_id}&userId=${item.stat.student_id}`} className="btn btn-small"  variant="warning">
                              View Result Detail
                            </a>
                        )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            )}
            {resultData.length === 0 && (
                <div className="alert alert-danger text-center" style={{marginTop: "80px"}}>No results found.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
