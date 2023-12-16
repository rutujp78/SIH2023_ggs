import React, { useEffect , useState} from 'react'
import { Chart as ChartJS, defaults } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { io } from 'socket.io-client'
import PropTypes from 'prop-types';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const SockGraph = ({ sockData }) => {
    const [chartData, setChartData] = useState(null)
    const [chartType, setChartType] = useState('hourly');

    // const unformattedData = nudge;

    useEffect(() => {
        const socket = io('http://localhost:5000', {
        path: '/socket/',
        // auth: {
        //     token: `${token}` // this is for pushing updated to respected user
        // }
    })

      socket.on('nudgeUpdated', (serverData) => {
        console.log(serverData);
        const groupedData = (serverData.data).map(info => {
            return { label: info.labels , aqi: info.aqi }
        })

        if(chartType === 'hourly') handleHourlyData(groupedData);
        // else if(chartType === 'daily') handleDailyData(groupedData);
        // else if(chartData === 'monthly') handleMontlyData(groupedData);
      })

      socket.on('error', error => console.log(error));
    
      const setFormattedData = () => {
            const groupedData = sockData.data.map(info => {
                return { label: info.labels , aqi: info.aqi }
            })
            const chartData = {
                labels: groupedData.length >= 12 ? groupedData.map(entry => new Date(entry.label).toLocaleString()).slice(-12) : groupedData.map(entry => new Date(entry.label).toLocaleString()),
                datasets: [
                    {
                        label: 'AQI',
                        data: groupedData.length >= 12 ? groupedData.map(entry => entry.aqi).slice(-12) : groupedData.map(entry => entry.aqi),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: "064FF0",
                        borderWidth: 2,
                        fill: false,
                    }
                ]
            }
            setChartData(chartData);
            setChartType('hourly');
      }
      setFormattedData();

      return () => {
        socket.disconnect();
      }
    }, [sockData, chartType])

    const handleHourlyData = (groupedData) => {
        console.log(groupedData);
        const chartData = {
            labels: groupedData.length >= 12 ? groupedData.map(entry => new Date(entry.label).toLocaleString()).slice(-12) : groupedData.map(entry => new Date(entry.label).toLocaleString()),
            datasets: [
                {
                    label: 'AQI',
                    data: groupedData.length >= 12 ? groupedData.map(entry => entry.aqi).slice(-12) : groupedData.map(entry => entry.aqi),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: "064FF0",
                    borderWidth: 2,
                    fill: false,
                }
            ]
        }

        setChartData(chartData);
        setChartType('hourly');
    }


  return (
    <div style={{border: '1px solid white', height: '400px', marginBottom: '25px'}}>
        {chartData && (
            <>
                <Line data={chartData}/>
                {/* <button onClick={() => handleHourlyData(data)}>Hourly</button> */}
                {/* <button onClick={() => handleDailyData(data)}>Daily</button> */}
                {/* <button onClick={() => handleMontlyData(data)}>Montly</button> */}
            </>
        )}
    </div>
  )
}

SockGraph.propTypes = {
    sockData: PropTypes.object.isRequired,
}

export default SockGraph