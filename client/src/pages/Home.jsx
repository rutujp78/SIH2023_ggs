import { useState, useEffect } from 'react';
import { Card, Loader, AddNudge } from '../components/homeComponents/index';
import PropTypes from 'prop-types';
import SockGraph from '../components/SockGraph';
import { createBrowserRouter, RouterProvider, Routes, Route, Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>LiFE Activities</h1>
            <div className="home-grid-container">
                <div className="grid-box">
                    <img src="https://missionlife-moefcc.nic.in/assets/img/icons/Save-energy.png" alt="" width={'250px'} />
                    <ul className='home-ul'>
                        <li>Energy Consumption</li>
                        <li>Energy Production</li>
                        <li>Energy-efficient manufacturing</li>
                    </ul>
                    <Link to="/energy">Click Here</Link>
                </div>
                <div className="grid-box">
                    <img src="https://missionlife-moefcc.nic.in/assets/img/icons/Say-no-to-SUP.png" alt="" width={'250px'} />
                    <ul>
                        <li>Production of Plastic</li>
                        <li>Distribution of Plastic</li>
                    </ul>
                    <Link to="/plastic">Click Here</Link>
                </div>
                <div className="grid-box">
                    <img src="https://missionlife-moefcc.nic.in/assets/img/icons/Adopt-Healthy-lifestyle.png" alt="" width={'250px'} />
                    <ul>
                        <li>Diet Habit</li>
                        <li>Smoking and Alcohol Consumption</li>
                        <li>Screen Time of Electronic Devices</li>
                    </ul>
                    <Link to="/health">Click Here</Link>
                </div>
                <div className="grid-box">
                    <img src="https://missionlife-moefcc.nic.in/assets/img/icons/Reduce-E-waste.png" alt="" width={'250px'} />
                    <ul>
                        <li>Waste Collection System</li>
                        <li>Recycling</li>
                        <li>Durability of Product</li>
                    </ul>
                    <Link to="/ewaste">Click Here</Link>
                </div>
            </div>
        </div>
    );

    




























































    // const [sockData, setSockData] = useState(null)
    // const [userId, setUserId] = useState("6581a78cf0344a00e5602d07");

    // useEffect(() => {
        
    //     const getData = async () => {
    //         const chartData = await fetch(`http://localhost:5000/nudges/${userId}`, {
    //         // const chartData = await fetch('https://7kqpyv77j6.execute-api.ap-south-1.amazonaws.com/prod/nudges', {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         });

    //         const processedChartData = await chartData.json();
    //         setSockData(processedChartData);
    //         console.log(sockData)
    //     }
        
    //     getData();

    // }, [])

    // const [allNudges, setAllNudges] = useState([]);
    // const [searchNudge, setSearchNudge] = useState('');
    // const [loading, setLoading] = useState(false);
    // const [addNudge, setAddNudge] = useState(false)

    // return (
    //     <main className='main-container '>
    //         <div className="main-title ">
    //             <h3>DASHBOARD</h3>
    //         </div>

    //         {allNudges.length > 0 ? (
    //             <div className="mt-16 justify-between">
    //                 <input type="text" placeholder='Search Nudge' className='mt-5'/>
    //                 <button className='mt-16' onClick={()=>setAddNudge(true)}>Add Nudge</button>

    //             </div>
    //         )
            
    //         : (
    //             <div className="mt-16">
    //                 <button className='cursor-pointer bg-[#6A0DAD]' onClick={()=>setAddNudge(true)}>Add Nudge</button>
    //             </div>
    //         )}

    //         {addNudge && (
    //             <AddNudge setAddNudge={setAddNudge}/>
    //         )}

    //         <div className='mt-10'>
    //             {loading ? (
    //                 <div className="flex justify-center items-center">
    //                     <Loader />
    //                 </div>
    //             ) : (
    //                 <>
    //                     {searchNudge && (
    //                         <h2 className='font-medium text-[#ffffff] text-xl mb-3'>
    //                             Showing results for <span className='text-[#ffffff]'>{searchNudge}</span>
    //                         </h2>
    //                     )}
    //                     <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
    //                         {searchNudge ? (
    //                             <RenderNudges 
    //                                 data={[]}
    //                                 title="No search results found"
    //                             />
    //                         ) : (
    //                             <>

    //                                 {sockData?.length > 0 && sockData.map((nudge) => (
    //                                     <>
    //                                         <SockGraph key={nudge._id} sockData={nudge}/>
    //                                     </>
    //                                 ))}
    //                             </>


    //                         )}
    //                     </div>
    //                 </>
    //             )}
    //         </div>
    //     </main>
    // )



















};

export default Home