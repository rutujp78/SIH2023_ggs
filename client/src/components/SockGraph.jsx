import { useEffect , useState} from 'react'
import { Chart as ChartJS, defaults } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { io } from 'socket.io-client'
import PropTypes from 'prop-types';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

const SockGraph = ({ sockData, category }) => {
    const [chartData, setChartData] = useState(null)
    const [chartType, setChartType] = useState('hourly');
    const [success, setSuccess] = useState(null);


    useEffect(() => {
        const socket = io('http://localhost:5000', {
        // const socket = io('https://7kqpyv77j6.execute-api.ap-south-1.amazonaws.com/prod', {
            path: '/socket/',
            // auth: {
            //     token: `${token}` // this is for pushing updated to respected user
            // }
        })

        socket.on('nudgeUpdated', (serverData) => {

            const groupedData = (serverData.data).map(info => {
                return { label: info.label , value: serverData.data.category === 'aqi' ? info.aqi : info.value }
            })

            if(chartType === 'hourly') handleHourlyData(groupedData);
            else if(chartType === 'daily') handleDailyData(serverData);
        })

      socket.on('error', error => console.log(error));
    
      const setFormattedData = () => {
            const groupedData = sockData.data.map(info => {
                return { label: info.label , value: info.value }
            })
            const chartData = {
                labels: groupedData.length >= 12 ? groupedData.map(entry => new Date(entry.label).toLocaleString()).slice(-12) : groupedData.map(entry => new Date(entry.label).toLocaleString()),
                datasets: [
                    {
                        label: `${category}`,
                        data: groupedData.length >= 12 ? groupedData.map(entry => entry.value).slice(-12) : groupedData.map(entry => entry.value),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: "064FF0",
                        borderWidth: 2,
                        fill: false,
                    }
                ]
            }
            setChartData(chartData);
            setChartType('hourly');

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
    }, [])

    const handleHourlyData = (groupedData) => {

        const chartData = {
            labels: groupedData.length >= 12 ? groupedData.map(entry => new Date(entry.label).toLocaleString()).slice(-12) : groupedData.map(entry => new Date(entry.label).toLocaleString()),
            datasets: [
                {
                    label: `${category}`,
                    data: groupedData.length >= 12 ? groupedData.map(entry => entry.value).slice(-12) : groupedData.map(entry => entry.value),
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

    const handleDailyData = (groupedData) => {
        setChartType('daily');
        // console.log(groupedData);

        const labels = groupedData.data.map(entry => new Date(entry.label).toLocaleDateString());
        const values = groupedData.data.map(entry => entry.value);

        const newGroupedData = labels.reduce((acc, label, index) =>{
            const day = label;
            acc[day] = acc[day] || { sum: 0, count: 0 };
            acc[day].sum += values[index];
            acc[day].count += 1;
            return acc;
        }, {});

        const averagedData = Object.keys(newGroupedData).map(day => {
            const value = Math.round(newGroupedData[day].sum /newGroupedData[day].count);
            return { day, value };
        })

        const chartData = {
            labels: averagedData.length >= 10 ? averagedData.map(entry => entry.day).slice(0, 10) : averagedData.map(entry => entry.day),
            datasets: [
                {
                    label: `${category}`,
                    data: averagedData.map(entry => entry.value),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: "064FF0",
                    borderWidth: 2,
                    fill: false,
                }
            ],
        }
        
        setChartData(chartData);
    }


  return (
    <div style={{border: '1px solid white', borderRadius: '1rem', padding: '10px', margin: '10px',height: 'auto', marginBottom: '25px'}}>
        <div className="name-nudge" style={{display:'flex', flexDirection:'column'}}>
            <span>Name: {sockData.name}</span>
            <span>Description: {sockData.description}</span>
            <span>City: {sockData.city.charAt(0).toUpperCase() + sockData.city.slice(1)}</span>
            <span>State: {sockData.state.charAt(0).toUpperCase() + sockData.state.slice(1)}</span>
            <span>Category: {category}</span>

            <span>Graph: </span>
        </div>

        {chartData && (
            <>
                <div className="graph" style={{height: '400px', marginBottom: '25px'}}>
                    <Line data={chartData}/>
                    <button onClick={() => handleHourlyData(sockData.data)}>Hourly</button>
                    <button onClick={() => handleDailyData(sockData)}>Daily</button>
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