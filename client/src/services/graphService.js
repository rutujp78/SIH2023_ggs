const getChartData = (sockData, category) => {
    const groupedData = sockData.data.map(info => {
        return { label: info.label, value: info.value }
    });
    const chartData = convertBasedOnTime(groupedData, category, 'hourly');
    // console.log("Chart Data: ", chartData);
    return chartData;
}

const convertBasedOnTime = (groupedData, category, format) => {
    const labels = groupedData.map(entry => new Date(entry.label).toLocaleString());
    const values = groupedData.map(entry => entry.value);
    if (format === 'hourly') {
        const chartData = {
            labels: labels.slice(-12),
            datasets: [
                {
                    label: `${category}`,
                    data: values.slice(-12),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: "064FF0",
                    borderWidth: 2,
                    fill: false,
                }
            ]
        };

        return chartData;
    }
    else if (format === 'daily') {
        const newGroupedData = labels.reduce((acc, label, index) => {
            const day = label;
            acc[day] = acc[day] || { sum: 0, count: 0 };
            acc[day].sum += values[index];
            acc[day].count += 1;
            return acc;
        }, {});

        const averagedData = Object.keys(newGroupedData).map(day => {
            const value = Math.round(newGroupedData[day].sum / newGroupedData[day].count);
            return { day, value };
        });

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
        };

        return chartData;
    }
    else if (format === 'montly') {
        console.log(format);
    }
};

export { getChartData, convertBasedOnTime };