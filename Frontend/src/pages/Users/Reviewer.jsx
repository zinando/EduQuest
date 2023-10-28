import { useState, useEffect } from 'react';
import '../../layout/Sidebar/SideBar.css'
import * as Unicons from '@iconscout/react-unicons';
import Navbar from '../../layout/NavBar/NavBar';
import Sidebar from '../../layout/Sidebar/SideBar';
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import { Col, Row, Table } from 'react-bootstrap';
import queryBackEnd, { userInfo, checkUserPermission, logOutUser } from '../queryBackEnd'
import useIdle from '../../pages/useIdleTimer'
import Container from 'react-bootstrap/Container';
import Timetable from '../../component/Timetable/Timetable'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import '../Dashboard/Home.css';


export default function Reviewers() {
   const [date, setDate] = useState(new Date());
   const navigate = useNavigate();
   const [items, setItems] = useState([{id:0,title:'',subject:'',klass:'',type:'',content:[]}]);


useEffect(() =>{
    //fetch items to be reviewed from database
    fetchReviewItems();

}, [])
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

const fetchReviewItems = () => {
    const req_data = {};
    //req_data.exam_id = examId; req_data.subject_id = subjectId;
    const url = '/dashboard/'+userInfo().adminType;
    const action = 'FETCH-REVIEW-ITEMS';

    queryBackEnd(url, req_data, action).then((response) => {
        let myItems = items;
        if (response.status === 1){
            myItems = response.data;

        } else{
            console.log('Nothing here');
        }
        setItems(myItems);
    });


  };

  // check if user is idle and logout user
  const { isIdle } = useIdle({ onIdle: logOutUser, idleTime: 30 });

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <Container>

            <Row style={{ height: '390px', marginBottom: '10px' }}>

              <Col xs={5}>
                <div className='calendar-container' style={{ height: '300px' }}>
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    className='border-0 shadow rounded-0 p-4'
                  />
                </div>
              </Col>
              <Col xs={7} >
                <div className='border-0 shadow rounded-0 p-4 ' style={{ height: '300px', overflowY: 'scroll' }}>
                  <Timetable />
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <div className='pt-4' style={{ height: '500px', overflowY: 'scroll' }}>
                    <Table className="custom-table">
                      <thead>
                        <tr>
                          <th>S/N</th>
                          <th>Title</th>
                          <th>Subject</th>
                          <th>Class</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {items.map((item, indx) => (
                          <tr key={item.id}>
                            <td>{indx+1}</td>
                            <td>{item.title}</td>
                            <td>{item.subject}</td>
                            <td>{item.klass}</td>
                            <td>{item.type}</td>
                            <td>
                            {item.type == "exam question" && (
                                <Button variant="primary" className="custom-button edit" onClick={()=>navigate({
                                        pathname:"/review_question",
                                        search: createSearchParams({item:JSON.stringify({id: item.id, subject:item.subject, klass:item.klass, content: item.content})}).toString()
                                    })}>
                                review question
                              </Button>
                            )}
                            {item.type == "exam result" && (
                                <Button className='exam-subject-span sp-1' onClick={()=>navigate({
                                        pathname:"/review_result",
                                        search: createSearchParams({examId:item.examina_id, subjectId:item.subject_id}).toString()
                                    })}>
                                        review result
                                </Button>
                            )}
                            </td>
                          </tr>
                      ))}
                      </tbody>

                    </Table>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </>
  )
}

