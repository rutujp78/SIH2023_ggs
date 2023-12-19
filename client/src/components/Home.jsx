import { useState, useEffect } from 'react';
// import { BsFillArchiveFill } from 'react-icons/bs'
// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Loader, AddNudge } from './homeComponents/index';
import PropTypes from 'prop-types'
// import data from '../assets/staticData';
// import testData from "../assets/testData"
// import GraphCard from './GraphCard';
import SockGraph from './SockGraph';

const RenderNudges = ({ data, title }) => {
    if(data?.length > 0) {
        return data.map((nudge) => <Card key={nudge._id} {...nudge} />);
    }

    return (
        <h2 className='mt-5 font-bold text-[] text-xl uppercase'>
            {title}
        </h2>
    )
}

RenderNudges.propTypes = {
    data: PropTypes.any.isRequired,
    title: PropTypes.any.isRequired,
  }

const Home = () => {

    // const nudge = [{
    //     _id: ";aljdf;",
    //     name: "Pani Pani Pani",
    //     desc: "kjsldjfoiej",
    //     state: "MH",
    //     city: "NGP",
    //     category: "aqi, water, etx",
    //     data: [100],
    //     createdBy: "DarkRaider",
    // }, {
    //     _id: " :JSDF:KJ",
    //     name: "AQI AMT",
    //     state: "MH",
    //     city: "AMT",
    //     category: "",
    //     data: [70],
    //     createdBy: "Kaka",
    // }]
    
    const [sockData, setSockData] = useState(null)

    useEffect(() => {
        
        const getData = async () => {
            const chartData = await fetch('http://localhost:5000/nudges', {
            // const chartData = await fetch('https://7kqpyv77j6.execute-api.ap-south-1.amazonaws.com/prod/nudges', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const processedChartData = await chartData.json();
            setSockData(processedChartData);
            console.log(sockData)
        }
        
        getData();

    }, [])
    

    const [allNudges, setAllNudges] = useState([]);
    const [searchNudge, setSearchNudge] = useState('');
    const [loading, setLoading] = useState(false);
    const [aqi, setAqi] = useState(0);
    const [addNudge, setAddNudge] = useState(false)

    // const data = [
    //     {
    //         name: 'Page A',
    //         uv: 4000,
    //         pv: 2400,
    //         amt: 2400,
    //     },
    //     {
    //         name: 'Page B',
    //         uv: 3000,
    //         pv: 1398,
    //         amt: 2210,
    //     },
    //     {
    //         name: 'Page C',
    //         uv: 2000,
    //         pv: 9800,
    //         amt: 2290,
    //     },
    //     {
    //         name: 'Page D',
    //         uv: 2780,
    //         pv: 3908,
    //         amt: 2000,
    //     },
    //     {
    //         name: 'Page E',
    //         uv: 1890,
    //         pv: 4800,
    //         amt: 2181,
    //     },
    //     {
    //         name: 'Page F',
    //         uv: 2390,
    //         pv: 3800,
    //         amt: 2500,
    //     },
    //     {
    //         name: 'Page G',
    //         uv: 3490,
    //         pv: 4300,
    //         amt: 2100,
    //     },
    // ];

    return (
        <main className='main-container '>
            <div className="main-title ">
                <h3>DASHBOARD</h3>
            </div>
            {/* <div className="main-cards ">

                <div className="card">
                    <div className="card-inner">
                        <h3>AQI</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{aqi}</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>WATER</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>300</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>ENGERGY</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>300</h1>
                </div>
                <div className="card">
                    <div className="card-inner">
                        <h3>PLASTIC PRODUCTION</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>300</h1>
                </div> */}


            {/* </div> */}

            {allNudges.length > 0 ? (
                <div className="mt-16 justify-between">
                    <input type="text" placeholder='Search Nudge' className='mt-5'/>
                    <button className='mt-16' onClick={()=>setAddNudge(true)}>Add Nudge</button>

                </div>
            )
            
            : (
                <div className="mt-16">
                    <button className='cursor-pointer bg-[#6A0DAD]' onClick={()=>setAddNudge(true)}>Add Nudge</button>
                </div>
            )}

            {addNudge && (
                <AddNudge setAddNudge={setAddNudge}/>
            )}

            <div className='mt-10'>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Loader />
                    </div>
                ) : (
                    <>
                        {searchNudge && (
                            <h2 className='font-medium text-[#ffffff] text-xl mb-3'>
                                Showing results for <span className='text-[#ffffff]'>{searchNudge}</span>
                            </h2>
                        )}
                        <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
                            {searchNudge ? (
                                <RenderNudges 
                                    data={[]}
                                    title="No search results found"
                                />
                            ) : (
                                <>
                                    {/* <RenderNudges 
                                        data={allNudges}
                                        title="No nudges found"
                                    /> */}
                                    {/* <GraphCard data={data}/> */}
                                    {/* <GraphCard data={testData}/> */}
                                    {sockData?.length > 0 && sockData.map((nudge) => (
                                        <>
                                            <SockGraph key={nudge._id} sockData={nudge}/>
                                        </>
                                    ))}
                                </>


                            )}
                        </div>
                    </>
                )}
            </div>

            {/* <div className='charts'>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
                            <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
                        </BarChart>
                    </ResponsiveContainer>
                </div> */}
        </main>
    )
}

export default Home