import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import backarrow from '../assets/backarrow.png';

function Update() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        seriesname: '',
        seasons: 0,
        ratingbefore: 0,
        ratingafter: 0,
        image: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`https://five5-worst-series-endings-1.onrender.com/read/${id}`);
                const originalValues = res.data; 
                setFormData({
                    seriesname: originalValues.seriesname,
                    seasons: originalValues.seasons,
                    ratingbefore: originalValues.ratingbefore,
                    ratingafter: originalValues.ratingafter,
                    image: originalValues.image
                });
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://five5-worst-series-endings-1.onrender.com/update/${id}`, formData);
            navigate('/');
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleBack = () => {
        navigate('/'); 
      };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img src={backarrow} alt="" id='backarrow' onClick={handleBack} />
            <div className="animated-form">
                <h2>Update Series</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Series Name:</label>
                        <input type="text" name="seriesname" value={formData.seriesname} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Seasons:</label>
                        <input type="number" name="seasons" value={formData.seasons} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Rating Before:</label>
                        <input type="number" name="ratingbefore" value={formData.ratingbefore} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Rating After:</label>
                        <input type="number" name="ratingafter" value={formData.ratingafter} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="image" value={formData.image} onChange={handleChange} />
                    </div>
                    <button type="submit">Update Series</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
