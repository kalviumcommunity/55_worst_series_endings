import React from 'react';
import './landing.css';
import seriesIcon from '../assets/seriesicon.png';

function Landing() {
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
                        {/* First row */}
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        </div>
                        <div className='row2'>
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div> 
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        <div className="container">
                            <img src="./Assets/food.png" alt="Food" className="foodSearched" />
                            <p className="foodnameSearched">Mexican Chicken</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;
