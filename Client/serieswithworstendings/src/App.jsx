import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Landing from './components/landing';
import Form from './components/form';

function App() {
  return (
    <BrowserRouter>
    
    <Routes>
    <Route path="/" element={<Landing />}/>
      <Route path="/form" element={<Form/>}/>
    </Routes>
    
    </BrowserRouter>
  );
}

export default App;
