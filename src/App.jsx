// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './Add';
import List from './List';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Add />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
