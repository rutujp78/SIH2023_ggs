import { useState, useEffect } from 'react';
import SockGraph from '../components/SockGraph';
import PropTypes from 'prop-types';
import nudgeService from '../services/nudgeService';
import AddNudge from '../components/AddNudge';
import './Parameter.css';

const Health = ({ userId }) => {
    const [sockData, setSockData] = useState(null);
    const [addNudge, setAddNudge] = useState(false);

    useEffect(() => {
        const getUserEnergyNudges = async () => {
            const nudges = await nudgeService.getNudges(userId, 'health');
            // console.log(nudges);
            setSockData(nudges);
        }
        getUserEnergyNudges();
    }, []);

    return (
        <main className='nudge-container '>
            <div className="main-title ">
                <h3>Health</h3>
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
};

Health.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default Health;