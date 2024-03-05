import './landing.css';
import seriesIcon from '../assets/seriesicon.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Landing() {
    const [seriesList, setSeriesList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://five5-worst-series-endings-1.onrender.com/read");
                setSeriesList(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <nav className="navbar">
                <img src={seriesIcon} alt="Example" className='tvshowimg' />
                <span className='navbartext'>Series with worst endings</span>
                <ul>
                    <li className="nav-item"><a href="#">Home</a></li>
                    <li className="nav-item"><a href="#">About page</a></li>
                    <li className="nav-item"><a href="#">About me</a></li>
                </ul>
                <div className="search-container">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
            </nav>
            <div className='translucentcontainer'>
                <div id="flexItems">
                    <br />
                    <div id="searchedSection">
                        <div className='row1'>
                            {seriesList.map(series => (
                                <div key={series.id} className="container">
                                    <img src={series.image} alt={series.seriesname} className="cardimg" />
                                    <div className='cardtext'>
                                        <p>{series.seriesname}</p>
                                        <p>{`Before: ${series.ratingbefore} After: ${series.ratingafter}`}</p>
                                        <p>{`Seasons: ${series.seasons}`}</p>
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
