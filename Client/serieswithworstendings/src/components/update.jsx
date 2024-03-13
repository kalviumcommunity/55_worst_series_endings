// update.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

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
                const res = await axios.get(`https://five5-worst-series-endings-1.onrender.com/icecream/${id}`);
                // Set the form data to the fetched data
                setFormData(res.data);
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
            // Redirect to landing page after successful update
            navigate('/');
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <div>
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
    );
}

export default Update;
