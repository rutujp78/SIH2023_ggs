import { Link } from 'react-router-dom';
import './Home.css';

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
};

export default Home