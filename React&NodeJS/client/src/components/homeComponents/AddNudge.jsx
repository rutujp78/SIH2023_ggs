import React from 'react'
import PropTypes from 'prop-types';

const AddNudge = ({ setAddNudge }) => {
  return (
    <div className='bg-black w-full h-full justify-center items-center'>
        <div className="h-[700px] w-[500px]">
            <div className='flex cursor-pointer right-0 top-0 m-2' onClick={() => setAddNudge(false)}>X</div>
            
        </div>
    </div>
  )
}

AddNudge.propTypes = {
    setAddNudge: PropTypes.any.isRequired,
}

export default AddNudge