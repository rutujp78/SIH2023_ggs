import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, defaults } from 'chart.js/auto'; // needed for Line graph
import { socket, socketService } from '../services/socketService';
import { convertBasedOnTime, getChartData } from '../services/graphService';
import PropTypes from 'prop-types';

const SockGraph = ({ sockData, category }) => {
    const [chartData, setChartData] = useState(null)
    const [chartType, setChartType] = useState('hourly');
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        socketService(chartType, handleDailyData, handleHourlyData);

        const setFormattedData = () => {
            console.log("Sock data: ", sockData);
            const chartData = getChartData(sockData, category)
            setChartType('hourly');
            setChartData(chartData);

            // logic for success
            setSuccess(30);
        }
        setFormattedData();

        return () => {
            // if(chartData) {
            //     chartData.destroy();
            // }
            socket.disconnect();
        }
    }, []);

    const handleHourlyData = (groupedData) => {
        const chartData = convertBasedOnTime(groupedData, category, 'hourly');
        setChartType('hourly');
        setChartData(chartData);
    }

    const handleDailyData = (groupedData) => {
        const chartData = convertBasedOnTime(groupedData, category, 'daily');
        setChartType('daily');
        setChartData(chartData);
    }

    return (
        <div style={{ border: '1px solid white', borderRadius: '1rem', padding: '10px', margin: '10px', height: 'auto', marginBottom: '25px' }}>
            <div className="name-nudge" style={{ display: 'flex', flexDirection: 'column' }}>
                <span>Name: {sockData.name}</span>
                <span>Description: {sockData.description}</span>
                <span>City: {sockData.city.charAt(0).toUpperCase() + sockData.city.slice(1)}</span>
                <span>State: {sockData.state.charAt(0).toUpperCase() + sockData.state.slice(1)}</span>
                <span>Category: {category}</span>
                <span>Graph: </span>
            </div>
            {chartData && (
                <>
                    <div className="graph" style={{ height: '400px', marginBottom: '25px' }}>
                        <Line data={chartData} />
                        <button onClick={() => handleHourlyData(sockData.data)}>Hourly</button>
                        <button onClick={() => handleDailyData(sockData.data)}>Daily</button>
                        <span>Success: {success}%</span>
                    </div>
                </>
            )}
        </div>
    )
}

SockGraph.propTypes = {
    sockData: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired
}

export default SockGraph