import React from 'react'
import { useState, useEffect } from 'react';
import SockGraph from '../components/SockGraph'
import staticData from '../staticData/productionPlastic'

const Plastic = () => {
    const [sockData, setSockData] = useState(null)

    useEffect(() => {

        const getData = async () => {
            // const chartData = await fetch(`http://localhost:5000/nudges/${userId}`, {
            //     // const chartData = await fetch('https://7kqpyv77j6.execute-api.ap-south-1.amazonaws.com/prod/nudges', {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json",
            //     }
            // });

            // const processedChartData = await chartData.json();
            // setSockData(processedChartData);
            // console.log(sockData)
            setSockData(staticData)
        }

        getData();

    }, [])

    const [allNudges, setAllNudges] = useState([]);
    const [searchNudge, setSearchNudge] = useState('');
    const [loading, setLoading] = useState(false);
    const [addNudge, setAddNudge] = useState(false)

    return (
        <div className='nudge-container '>
            <div className="main-title ">
                <h3>Plastic</h3>
            </div>

            {allNudges.length > 0 ? (
                <div className="search-nudge">
                    <input type="text" placeholder='Search Nudge' className='mt-5' />
                    <button className='add-nudge-button' onClick={() => setAddNudge(true)}>Add Nudge</button>

                </div>
            )

                : (
                    <div className="search-nudge">
                        <button className='add-nudge-button' onClick={() => setAddNudge(true)}>Add Nudge</button>
                    </div>
                )}

            {addNudge && (
                // <AddNudge setAddNudge={setAddNudge}/>
                <></>
            )}

            <div className='graph-container'>
                {loading ? (
                    <div className="flex justify-center items-center">
                        {/* <Loader /> */}
                    </div>
                ) : (
                    <>

                        {sockData?.length > 0 && sockData.map((nudge) => (
                            <>
                                <SockGraph key={nudge._id} chartId={nudge._id} sockData={nudge} category="Plastic"/>
                            </>
                        ))}

                    </>
                )}
            </div>
        </div>
    )
}

export default Plastic