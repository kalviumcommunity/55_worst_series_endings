import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import seriesIcon from '../assets/seriesicon.png';
import './landing.css';

function Landing() {
    const [seriesList, setSeriesList] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                const seriesRes = await axios.get("https://five5-worst-series-endings-1.onrender.com/read");
                setSeriesList(seriesRes.data);
                const usersRes = await axios.get(`https://five5-worst-series-endings-1.onrender.com/users`);
                setUsers(usersRes.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://five5-worst-series-endings-1.onrender.com/delete/${id}`);
            const updatedRes = await axios.get("https://five5-worst-series-endings-1.onrender.com/read");
            setSeriesList(updatedRes.data);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleUserSelect = async () => {
        
        try {
            const res = await axios.get(`https://five5-worst-series-endings-1.onrender.com/read`);
            const userData = res.data
            userData.forEach(element => {
                setSelectedUser(element.createdby)
            });
        } catch (err) {
            console.log(err);
        }
    };

    const filteredList = selectedUser === 'All' ? seriesList:seriesList.filter(series => series.created_by === selectedUser)
    return (
        <div>


            <nav className="navbar">
                <img src={seriesIcon} alt="Example" className='tvshowimg' />
                <span className='navbartext'>Series with worst endings</span>
                <ul>
                    <li className="nav-item"><Link to="/signup">Sign Up</Link></li>
                    <li className="nav-item"><Link to="/login">Login</Link></li>
                    <li className="nav-item"><Link to="/form">Add entity</Link></li>
                </ul>
                {/* <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div> */}
                <select value={selectedUser} onChange={(e) => handleUserSelect(e.target.value)}>
                    <option value="All" >All</option>
                    {users.map(user => (
                        <option key={user._id} value={user._id}>{user.username}</option>
                    ))}
                </select>
            </nav>
            <div className='translucentcontainer'>

                <div id="flexItems">
                    <br />
                    <div id="searchedSection">
                        <div className='row1'>
                            {seriesList.map(series => (
                                <div key={series._id} className="container">
                                    <img src={series.image} alt={series.seriesname} className="cardimg" />
                                    <div className='cardtext'>
                                        <p>{series.seriesname}</p>
                                        <p>{`Before: ${series.ratingbefore} After: ${series.ratingafter}`}</p>
                                        <p>{`Seasons: ${series.seasons}`}</p>

                                        <button> <Link to={`/update/${series._id}`} className='uplink'>
                                            Update
                                        </Link></button>
                                        <button onClick={() => handleDelete(series._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Landing;
