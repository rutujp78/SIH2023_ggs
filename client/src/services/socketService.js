import { io } from 'socket.io-client'

let socket;
const socketService = (chartType, handleDailyData, handleHourlyData) => {
    socket = io('http://localhost:5000', {
        // const socket = io('https://7kqpyv77j6.execute-api.ap-south-1.amazonaws.com/prod', {
        path: '/socket/',
        // auth: {
        //     token: `${token}` // this is for pushing updated to respected user
        // }
    });
    
    socket.on('nudgeUpdated', (serverData) => {
    
        const groupedData = (serverData.data).map(info => {
            return { label: info.label, value: serverData.data.category === 'aqi' ? info.aqi : info.value }
        })
    
        if (chartType === 'hourly') handleHourlyData(groupedData);
        else if (chartType === 'daily') handleDailyData(serverData);
    })
    
    socket.on('error', error => console.log(error));
}

export { socket, socketService };