import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Landing from './components/landing';
import Form from './components/form';
import Update from './components/update';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Landing />}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/update/:id" element={<Update/>} />
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
