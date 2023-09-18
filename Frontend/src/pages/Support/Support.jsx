import { useEffect } from 'react';
import echarts from 'echarts';

function PieChart() {
  useEffect(() => {
    // Create a DOM element to render the chart
    const chartContainer = document.getElementById('pie-chart-container');
    const chart = echarts.init(chartContainer);

    // Define the data for the pie chart
    const data = [
      { name: 'Teachers', value: 12 },
      { name: 'Students', value: 403 },
      { name: 'Reviewers', value: 6 },
    ];

    // Create the pie chart option
    const option = {
      title: {
        text: 'User Stats',
        textStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
      },
      series: [
        {
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: data.map(item => ({
            name: item.name,
            value: item.value,
          })),
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)',
          },
        },
      ],
    };

    // Set the chart option and resize the chart when the window size changes
    chart.setOption(option);
    window.addEventListener('resize', () => {
      chart.resize();
    });

    // Clean up the chart when the component is unmounted
    return () => {
      chart.dispose();
      window.removeEventListener('resize', () => {
        chart.resize();
      });
    };
  }, []);

  return (
    <div id="pie-chart-container" style={{ width: '100%', height: '300px' }}></div>
  );
}

export default PieChart;
