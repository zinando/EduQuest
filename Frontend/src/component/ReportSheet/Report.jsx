
import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { userInfo } from '../../pages/queryBackEnd';

function App() {
  const user = userInfo(); // Get user information
  const userFullName = user.fullName; //Get the full name from user information

  const courses = [
    { name: 'Math', score: 85 },
    { name: 'Science', score: 92 },
    { name: 'History', score: 78 },
    { name: 'English', score: 88 },
    { name: 'Art', score: 95 },
  ];

  // Calculate the cumulative average
  const totalScores = courses.reduce((total, course) => total + course.score, 0);
  const cumulativeAverage = (totalScores / courses.length).toFixed(2);

  // Function to handle the "View Transcript" action
  const handleViewTranscript = (courseName) => {
    // Add custom logic for viewing the transcript(will use this in future)
    console.log(`View Transcript for ${courseName}`);
  };

  return (
    <div className="home-content pt-2 p-4">
      <Typography variant="h6" gutterBottom>
        Report Sheet
      </Typography>
      <Typography variant="h6" gutterBottom>
        Student Name: {userFullName}
      </Typography>
      <Typography variant="h6" gutterBottom style={{ color: '#0B88B3' }}>
        Cumulative Average: {cumulativeAverage}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: '33%' }}>Course</TableCell>
              <TableCell style={{ width: '33%' }}>Score</TableCell>
              <TableCell style={{ width: '34%' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell style={{ width: '33%' }}>{course.name}</TableCell>
                <TableCell style={{ width: '33%' }}>{course.score}</TableCell>
                <TableCell style={{ width: '34%' }}>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewTranscript(course.name)}
                    style={{ marginLeft: 'auto' }} 
                  >
                    View Transcript
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </div>
  );
}

export default App;
