import { Pie } from 'react-chartjs-2';

const UserStatsPieChart = () => {
  // Data for the pie chart
  const data = {
    labels: ['Teachers', 'Students', 'Reviewers'],
    datasets: [
      {
        data: [12, 403, 6],
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
