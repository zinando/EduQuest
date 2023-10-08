import { Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

function App() {
  const studentName = 'John Doe';
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

  return (
    <div className="home-content pt-2 p-4">
      <Typography variant="h5" gutterBottom>
        Report Sheet
      </Typography>
      <Typography variant="h5" gutterBottom>
        Student Name: {studentName}
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.map((course, index) => (
              <TableRow key={index}>
                <TableCell>{course.name}</TableCell>
                <TableCell>{course.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom>
        Cumulative Average: {cumulativeAverage}
      </Typography>
    </div>
  );
}

export default App;
