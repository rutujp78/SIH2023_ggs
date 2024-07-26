import { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from 'chart.js/auto';
import SockGraph from '../components/SockGraph';
import PropTypes from 'prop-types';
import nudgeService from '../services/nudgeService';
import AddNudge from '../components/AddNudge';
import './Parameter.css';

const Energy = ({ userId }) => {
    const [sockData, setSockData] = useState(null);
    const [addNudge, setAddNudge] = useState(false);

    useEffect(() => {
        const getUserEnergyNudges = async () => {
            const nudges = await nudgeService.getNudges(userId, 'aqi'); // or energy instead of aqi
            // console.log(nudges);
            setSockData(nudges);
        }
        getUserEnergyNudges();
    }, []);

    return (
        <main className='nudge-container '>
            <div className="main-title ">
                <h3>Energy</h3>
            </div>

            <div className="mt-16">
                <button className='cursor-pointer bg-[#6A0DAD]' onClick={() => setAddNudge(true)}>Add Nudge</button>
            </div>
            {addNudge && (
                <AddNudge userId={userId} category={"energy"} setAddNudge={setAddNudge} />
            )}

            <div className='mt-10'>
                {sockData?.length > 0 && sockData.map((nudge) => (
                    <SockGraph key={nudge._id} chartId={nudge._id} sockData={nudge} category="Energy (Giga Watt Hour)" />
                ))}
            </div>
        </main>
    );
}

Energy.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default Energy;