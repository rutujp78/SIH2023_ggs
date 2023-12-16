import React from 'react'
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

// Connect to the socket server at localhost:5000 with the `/socket` path
// const socket = io('http://localhost:5000', {
//   path: '/socket/',
// });

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const GraphCard = ({ data }) => {
    const [chartData, setChartData] = useState(null)

    let reelData;
    
    // socket.on('nudgeUpdated', (serverData) => {
    //   reelData = serverData;
    // });
    useEffect(() => {
      // Listen for the `nudgeUpdated` event emitted by the server

    // Listen for socket errors
    // socket.on('error', (error) => console.log(error));

      if(data) {
        const labels = data.data.map(entry => new Date(entry.timestamp_local).toLocaleDateString()).reverse(); // converts local_time to date like 2023/12/12
        const aqiValues = data.data.map(entry => entry.aqi).reverse(); //array that contains aqi values

        const groupedData = labels.reduce((acc, label, index) => {
            // const day = new Date(label).toLocaleDateString();
            const day = label;
            acc[day] = acc[day] || { sum: 0, count: 0}; // creates new entry for the day if dosent exists
            acc[day].sum += aqiValues[index];
            acc[day].count += 1;
            return acc;
        }, {});
        // console.log(groupedData); // '2/12/2023' : {sum : x, count: y}

        const averagedData = Object.keys(groupedData).map(day => {
            const averageAqi = Math.round(groupedData[day].sum / groupedData[day].count);
            return { day, averageAqi }; // day: '2/12/2023', averageAqi: 169
        });

        const chartData = {
          labels: averagedData.length >= 7 ? averagedData.map(entry => entry.day).reverse().slice(0, 7) : averagedData.map(entry => entry.day).reverse(),
          datasets: [
            {
                label: 'Average AQI',
                data: averagedData.map(entry => entry.averageAqi).reverse(),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: "064FF0",
                borderWidth: 2,
                fill: false,
            },
          ],
        };
        setChartData(chartData);
      }
    }, [data])
    
    const handleDailyData = ( data ) => {
      if(data) {
        const labels = data.data.map(entry => new Date(entry.timestamp_local).toLocaleDateString()).reverse();
        const aqiValues = data.data.map(entry => entry.aqi).reverse();

        const groupedData = labels.reduce((acc, label, index) => {
          const day = label;
          acc[day] = acc[day] || { sum: 0, count: 0 };
          acc[day].sum += aqiValues[index];
          acc[day].count += 1;

          return acc;
        }, {});

        const averagedData = Object.keys(groupedData).map(day => {
          const averageAqi = Math.floor(groupedData[day].sum / groupedData[day].count);

          return { day, averageAqi };
        })

        console.log(averagedData);

        const chartData = {
          labels: averagedData.map(entry => entry.day).slice(0, 10),
          datasets: [
            {
              label: 'Average AQI',
              data: averagedData.map(entry => entry.averageAqi).slice(0, 10),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: "064FF0",
              borderWidth: 2,
              fill: false,
            }
          ]
        };

        setChartData(chartData);
      }
    }

    const handleMontlyData = (data) => {
      const labels = data.data.map(entry => `${new Date(entry.timestamp_local).getMonth() + 1}/${new Date(entry.timestamp_local).getFullYear()}`).reverse();
      const aqiValues = data.data.map(entry => entry.aqi).reverse();

      const groupedData = labels.reduce((acc, label, index) => {
        const month = label;
        acc[month] = acc[month] || { sum: 0, count: 0 };
        acc[month].sum += aqiValues[index];
        acc[month].count += 1;

        return acc;
      }, {});

      const averagedData = Object.keys(groupedData).map(month => {
        const averageAqi = Math.floor(groupedData[month].sum / groupedData[month].count);

        return { month, averageAqi };
      })

      console.log(averagedData);

      const chartData = {
        labels: averagedData.length >= 12 ? averagedData.map(entry => entry.month).slice(0, 12) : averagedData.map(entry => entry.month),
        datasets: [
          {
            label: 'Average AQI',
            data: averagedData.length >= 12 ? averagedData.map(entry => entry.averageAqi).slice(0, 12) : averagedData.map(entry => entry.averageAqi),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: "064FF0",
            borderWidth: 2,
            fill: false,
          }
        ]
      };

      setChartData(chartData);
    }

    const handleHourlyData = (data) => {
      const labels = data.data.map(entry => new Date(entry.timestamp_local).toLocaleString()).reverse();
      const aqiValues = data.data.map(entry => entry.aqi).reverse();

      const hourlyData = labels.map((hour, index) => {
        return { hour: hour,  aqi: aqiValues[index] }
      })

      const chartData = {
        labels: hourlyData.length >= 12 ? hourlyData.map(entry => entry.hour).slice(0, 12) : hourlyData.map(entry => entry.hour),
        datasets: [
          {
            label: 'Average AQI',
            data: hourlyData.length >= 12 ? hourlyData.map(entry => entry.aqi).slice(0, 12) : hourlyData.map(entry => entry.aqi),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: "064FF0",
            borderWidth: 2,
            fill: false,
          }
        ]
      };

      setChartData(chartData);
    }

  return (
    <div className='border border-white p-4 h-[400px]' style={{border: '1px solid white', height: '400px', marginBottom: '25px'}}>
      {chartData && (
        <>
        <Line data={chartData} />
        <button onClick={() => handleHourlyData(data)}>Hourly</button>
        <button onClick={() => handleDailyData(data)}>Daily</button>
        <button onClick={() => handleMontlyData(data)}>Montly</button>
        {/* <button onClick={handleYearlyData(data)}>Yearly</button> */}
        </>
      )}
    </div>
  )
}

GraphCard.propTypes = {
    data: PropTypes.any.isRequired,
}
export default GraphCard