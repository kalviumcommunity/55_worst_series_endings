import React, { useState } from 'react';
import './form.css'; 
import { useNavigate } from 'react-router-dom';
import backarrow from '../assets/backarrow.png'

function Form() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        seriesName: '',
        ratingBefore: '',
        ratingAfter: '',
        numberOfSeasons: ''
    });

    const handleChange = (event) => {
      const { name, value, type, checked } = event.target;
      const newValue = type === 'checkbox' ? checked : value;
      setFormData((prevInfo) => ({
        ...prevInfo,
        [name]: newValue,
      }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      axios.post('https://server-folder-ftte.onrender.com/new', formData)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return (
        <div className="Form">
          <img src={backarrow} alt="" id='backarrow' />
            <form className="animated-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="seriesName"
                    placeholder="Series Name"
                    value={formData.seriesName}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="ratingBefore"
                    placeholder="Rating Before"
                    value={formData.ratingBefore}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="ratingAfter"
                    placeholder="Rating After"
                    value={formData.ratingAfter}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="numberOfSeasons"
                    placeholder="Number of Seasons"
                    value={formData.numberOfSeasons}
                    onChange={handleChange}
                />
                <button type="submit">Add entity</button>
            </form>
        </div>
    );
}

export default Form;
