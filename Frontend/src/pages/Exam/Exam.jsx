import '../../layout/Sidebar/SideBar.css'
import Sidebar from '../../layout/Sidebar/SideBar'
import Navbar from '../../layout/Navbar/NavBar'



const Exam = () => {
  const questions = [
    'What is the capital of France?',
    'What is the largest ocean in the world?',
    'What is the square root of 16?',
    'What is the meaning of life?',
    'What is the best programming language?'
  ];

  const answers = [
    ['Paris', 'Lyon', 'Marseille'],
    ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    ['4', '6', '8', '10'],
    ['The meaning of life is up to each individual to decide.', 'To find happiness.', 'To make a difference in the world.'],
    ['Python', 'JavaScript', 'Java', 'C++']
  ];

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <table className="table">
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((question, index) => (
                <tr key={index}>
                  <td>{question}</td>
                  <td>
                    {answers[index].map((answer, index) => (
                      <option key={index}>{answer}</option>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      </section>
    </>
  )
}
export default Exam

