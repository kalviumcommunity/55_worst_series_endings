    import React from 'react';
    import './landing.css';
    import seriesIcon from '../assets/seriesicon.png';
    import howimetyourmother from '../assets/howimetyourmother.jpg';

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
                            <div className="container">
                                <img src={howimetyourmother} alt="Food" className="cardimg" />
                                <div className='cardtext'>
                                <p>How i met your mother</p>
                                <p>Before: 8/10 After:4/10</p>
                                <p >Seasons: 11</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    export default Landing;
