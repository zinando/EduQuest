import Sidebar from '../../layout/Sidebar/SideBar';
import Navbar from '../../layout/Navbar/NavBar';
import { Card, CardContent, Typography } from '@mui/material';

const ExamSheet = () => {
  // Data for the subject list
  const subjects = [
    {
      title: 'Mathematics',
      description: 'Advanced Mathematics',
    },
    {
      title: 'Science',
      description: 'Physics, Chemistry, Biology',
    },
    {
      title: 'History',
      description: 'World History',
    },
    {
      title: 'English',
      description: 'Literature and Language Arts',
    },
    // Add more subjects as needed
  ];

  return (
    <>
      <Sidebar />
      <section className="home-section">
        <Navbar />
        <div className="home-content">
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {subjects.map((subject, index) => (
              <Card key={index} style={{ margin: '16px', minWidth: '250px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {subject.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {subject.description}
                  </Typography>
                </CardContent>
                
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExamSheet;
