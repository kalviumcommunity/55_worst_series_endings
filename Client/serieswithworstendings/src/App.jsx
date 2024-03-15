import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Landing from './components/landing';
import Form from './components/form';
import Update from './components/update';
import Login from './components/login'; 
import Signup from './components/signup'; 

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Landing />}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/update/:id" element={<Update/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
