import { useState, useEffect } from 'react';
import SockGraph from '../components/SockGraph';
import './Parameter.css';
import PropTypes from 'prop-types';
import nudgeService from '../services/nudgeService';
import AddNudge from '../components/AddNudge';

const Energy = ({ userId }) => {
    const [sockData, setSockData] = useState(null)

    useEffect(() => {

        const getUserEnergyNudges = async () => {
            const nudges = nudgeService.getNudges(userId, 'energy');
            setSockData(nudges);
            // console.log(sockData)
        }

        getUserEnergyNudges();

    }, [])

    const [allNudges, setAllNudges] = useState([]);
    const [searchNudge, setSearchNudge] = useState('');
    const [loading, setLoading] = useState(false);
    const [addNudge, setAddNudge] = useState(false)

    return (
        <main className='nudge-container '>
            <div className="main-title ">
                <h3>Energy</h3>
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
                <AddNudge userId={userId} category={"energy"} setAddNudge={setAddNudge} />
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
                                <SockGraph key={nudge._id} chartId={nudge._id} sockData={nudge} category="Energy (Giga Watt Hour)"/>
                                {/* <SockGraph key={nudge._id} chartId={nudge._id} sockData={nudge} category="Energy (Giga Watt Hour)"/> */}
                            </>
                        ))}

                    </>
                )}
            </div>
        </main>
    )
}

Energy.propTypes = {
    userId: PropTypes.any.isRequired,
}

export default Energy