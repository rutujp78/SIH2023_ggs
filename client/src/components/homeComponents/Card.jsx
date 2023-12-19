import PropTypes from 'prop-types'

const Card = ({ _id, name, state, desc, city, category, data, createdBy}) => {
  return (
    <div className='rounded-xl mt-5 group relative shadow-card hover:shadow-cardhover card'>
        <div className="">{_id}</div>
        <div className="">{name}</div>
        <div className="">{state} {city}</div>
        {/* Chart stuff */}
        <div className="">{desc}</div>
        <div className="">{category}</div>
        <div className="">{data[0]}</div>
        <div className="">{createdBy}</div>
    </div>
  )
}

Card.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    createdBy: PropTypes.string.isRequired,
  }

export default Card