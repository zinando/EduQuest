import { Pie } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const UserStatsPieChart = () => {
  //define and initialize state variables
   const [userStat, setUserStat] = useState({teachers: 0, students: 0, reviewers: 0});

  useEffect(() => {
    // update state variables from session storage
    if (sessionStorage.getItem('examRecords')){
        //update state variables
        setUserStat(sessionStorage.getItem('userStat').json());
    }
  }, []);

  // Data for the pie chart
  const data = {
    labels: ['Teachers', 'Students', 'Reviewers'],
    datasets: [
      {
        data: [userStat.teachers, userStat.students, userStat.reviewers],
        backgroundColor: ['#0B88B3', '#FF5733', '#FFC300'], // You can set custom colors here
      },
    ],
  };

  return (
    <div>

        <Pie data={data} />
      </div>
    
  );
};

export default UserStatsPieChart;
