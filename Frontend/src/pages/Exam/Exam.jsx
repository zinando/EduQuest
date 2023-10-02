import { useState } from 'react';
import '../../layout/Sidebar/SideBar.css';
import Sidebar from '../../layout/Sidebar/SideBar';
import Navbar from '../../layout/Navbar/NavBar';
import Paper from '@mui/material/Paper';
import CountdownTimer from '../../component/Timer/Timer';
import triangle from '../../assets/triangle.gif';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';

import './exam.css';

const Exam = () => {
  const questions = [
    {
      id: 1,
      question: "In a right triangle, if one of the legs is 3 units long, and the hypotenuse is 5 units long, what is the length of the other leg?",
      diagram: triangle,
      answers: ["A. 2 units", "B. 3 units", "C. 4 units", "D. 6 units"],
      correctAnswer: "B. 3 units",
    },
    {
      id: 2,
      question: "If the radius of a circle is 6 centimeters, what is the area of the circle?",
      diagram: null, 
      answers: ["A. 12 cm²", "B. 18 cm²", "C. 36 cm²", "D. 72 cm²"],
      correctAnswer: "C. 36 cm²",
    },
    {
      id: 3,
      question: "What is the result of 7 × 8 - 3²?",
      answers: ["A. 40", "B. 49", "C. 53", "D. 56"],
      correctAnswer: "B. 49",
    },
    {
      id: 4,
      question: "If the length of a rectangular garden is 12 meters and the width is 8 meters, what is the perimeter of the garden?",
      diagram: null,
      answers: ["A. 16 meters", "B. 32 meters", "C. 40 meters", "D. 48 meters"],
      correctAnswer: "C. 40 meters",
    },
    {
      id: 5,
      question: "What is the area of a triangle with a base of 10 centimeters and a height of 6 centimeters?",
      diagram: "[Insert diagram here]",
      answers: ["A. 15 cm²", "B. 30 cm²", "C. 45 cm²", "D. 60 cm²"],
      correctAnswer: "B. 30 cm²",
    },
  ];

  const questionsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;
  const currentQuestions = questions.slice(startIndex, endIndex);

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div className='exam'>
            <ul>
              <li><h5>First Term Examination</h5></li>
              <li> <CountdownTimer /></li>
              <li>Mathematics</li>
              <li>Score: 5</li>
            </ul>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table aria-label="Math Questions Table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Diagram</TableCell>
                    <TableCell>Answers</TableCell>
                    <TableCell>Correct Answer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentQuestions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell>{question.id}</TableCell>
                      <TableCell>{question.question}</TableCell>
                      <TableCell>
                        {question.diagram && (
                          <img src={question.diagram} alt={`Diagram for question ${question.id}`} />
                        )}
                      </TableCell>
                      <TableCell>
                        <ul>
                          {question.answers.map((answer) => (
                            <li key={answer}>{answer}</li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>{question.correctAnswer}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {currentPage > 1 && (
                <Button variant="contained" color="primary" onClick={handlePrevPage}>
                  Previous
                </Button>
              )}

              {currentPage < totalPages && (
                <Button variant="contained" color="primary" onClick={handleNextPage} style={{ marginLeft: '10px' }}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default Exam;
