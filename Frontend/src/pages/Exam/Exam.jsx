import '../../layout/Sidebar/SideBar.css'
import Sidebar from '../../layout/Sidebar/SideBar'
import Navbar from '../../layout/Navbar/NavBar'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import CountdownTimer from '../../component/Timer/Timer';
import './exam.css'


const Exam = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={8}>
                <Item>
                  In a right triangle, if one of the legs is 3 units long, 
                  and the hypotenuse is 5 units long, what is the length of the other leg?
                </Item>
              </Grid>
              <Grid xs={4}>
                <Item>xs=4</Item>
              </Grid>
             
              <Grid xs={12}>
                <Item>xs=8</Item>
              </Grid>
            </Grid>
          </Box>
          


        </div>
        
      </section>
    </>
  )
}
export default Exam

