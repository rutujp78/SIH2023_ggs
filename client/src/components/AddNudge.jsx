import { useState } from 'react'
import PropTypes from 'prop-types';
import nudgeService from '../services/nudgeService';

const AddNudge = ({ userId, category, setAddNudge }) => {
    const token = localStorage.getItem('token');
    const [nudgeData, setNudgeData] = useState({
        name: '',
        description: '',
        city: '',
        state: '',
        category: category,
    });

    // save to db;
    const addNudge = (e) => {
        console.log(userId, nudgeData);
        e.preventDefault();
        const newNudge = nudgeService.addNudge(userId, nudgeData, token);
        console.log(newNudge);
        window.location.reload();
    }

  return (
    <div className='add-nudge-box'>
        <h3>Add Nudge</h3>
        <div className="close" onClick={() => setAddNudge(false)}>X</div>
        <form onSubmit={addNudge}>
            <input type="text" placeholder='name' onChange={(e) => setNudgeData({ ...nudgeData, name: e.target.value })} />
            <input type="text" placeholder='description' onChange={(e) => setNudgeData({ ...nudgeData, description: e.target.value })} />
            <input type="text" placeholder='city' onChange={(e) => setNudgeData({ ...nudgeData, city: e.target.value })}/>
            <input type="text" placeholder='state' onChange={(e) => setNudgeData({ ...nudgeData, state: e.target.value })} />

            <button type='submit'>Add Nudge</button>
        </form>
    </div>
  )
}

AddNudge.propTypes = {
    userId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    setAddNudge: PropTypes.func.isRequired,
}

export default AddNudge