import React, { useState } from 'react';
import './form.css';
import { useNavigate } from 'react-router-dom';
import backarrow from '../assets/backarrow.png'
import axios from 'axios';


function Form() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    seriesname: '',
    seasons: '',
    ratingbefore: '',
    ratingafter: '',
    image: '',
    createdby: `${sessionStorage.getItem('username')}`
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
    axios.post('https://five5-worst-series-endings-1.onrender.com/new', formData)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBack = () => {
    navigate('/'); 
  };

  return (
    <div className="Form">
      <img src={backarrow} alt="" id='backarrow' onClick={handleBack} />
      <form className="animated-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="seriesname"
          placeholder="Series Name"
          value={formData.seriesname}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ratingbefore"
          placeholder="Rating Before"
          value={formData.ratingbefore}
          onChange={handleChange}
        />
        <input
          type="number"
          name="ratingafter"
          placeholder="Rating After"
          value={formData.ratingafter}
          onChange={handleChange}
        />
        <input
          type="number"
          name="seasons"
          placeholder="Number of Seasons"
          value={formData.seasons}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="image"
          value={formData.image}
          onChange={handleChange}
        />
        <button type="submit">Add entity</button>
      </form>
    </div>
  );
}

export default Form;
