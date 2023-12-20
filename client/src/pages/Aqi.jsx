    import React from 'react'
    import { useState, useEffect } from 'react';
    import SockGraph from '../components/SockGraph'

    const Aqi = () => {
        const [sockData, setSockData] = useState(null)
        const [userId, setUserId] = useState("6581a78cf0344a00e5602d07");

        useEffect(() => {

            const getData = async () => {
                const chartData = await fetch(`http://localhost:5000/nudges/${userId}`, {
                    // const chartData = await fetch('https://7kqpyv77j6.execute-api.ap-south-1.amazonaws.com/prod/nudges', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
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
        const [addNudge, setAddNudge] = useState(false)

        return (
            <main className='main-container '>
                <div className="main-title ">
                    <h3>DASHBOARD</h3>
                </div>

                {allNudges.length > 0 ? (
                    <div className="mt-16 justify-between">
                        <input type="text" placeholder='Search Nudge' className='mt-5' />
                        <button className='mt-16' onClick={() => setAddNudge(true)}>Add Nudge</button>

                    </div>
                )

                    : (
                        <div className="mt-16">
                            <button className='cursor-pointer bg-[#6A0DAD]' onClick={() => setAddNudge(true)}>Add Nudge</button>
                        </div>
                    )}

                {addNudge && (
                    // <AddNudge setAddNudge={setAddNudge}/>
                    <></>
                )}

                <div className='mt-10'>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            {/* <Loader /> */}
                        </div>
                    ) : (
                        <>

                            {sockData?.length > 0 && sockData.map((nudge) => (
                                <>
                                    <SockGraph key={nudge._id} chartId={nudge._id} sockData={nudge} category='Aqi'/>
                                </>
                            ))}

                        </>
                    )}
                </div>
            </main>
        )
    }

    export default Aqi