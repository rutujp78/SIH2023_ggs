import { useState, useEffect } from 'react';
import SockGraph from '../components/SockGraph'
import nudgeService from '../services/nudgeService';
import PropTypes from 'prop-types';
import AddNudge from '../components/AddNudge';
import './parameter.css';

const Ewaste = ({ userId }) => {
    const [sockData, setSockData] = useState(null)
    const [addNudge, setAddNudge] = useState(false);

    useEffect(() => {
        const getUserEwasteNudges = async () => {
            const nudges = await nudgeService.getNudges(userId, 'ewaste');
            setSockData(nudges);
        }
        getUserEwasteNudges();
    }, []);

    return (
        <main className='nudge-container '>
            <div className="main-title ">
                <h3>E-waste</h3>
            </div>

            <div className="mt-16">
                <button className='cursor-pointer bg-[#6A0DAD]' onClick={() => setAddNudge(true)}>Add Nudge</button>
            </div>
            {addNudge && (
                <AddNudge userId={userId} category={"ewaste"} setAddNudge={setAddNudge} />
            )}

            <div className='mt-10'>
                {sockData?.length > 0 && sockData.map((nudge) => (
                    <SockGraph key={nudge._id} chartId={nudge._id} sockData={nudge} category="Energy (Giga Watt Hour)" />
                ))}
            </div>
        </main>
    );
};

Ewaste.propTypes = {
    userId: PropTypes.string.isRequired,
}

export default Ewaste;