import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

class ResponseTimes extends React.Component {
      render(props) {
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
          },
        };

        const data = {
          labels: this.props.labels, 
          datasets: [
            {
              label: 'Response Times',
              data: this.props.responseTimes,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        };
        return (
            <Line options={options} data={data} />
        );
    };
}

export default ResponseTimes;