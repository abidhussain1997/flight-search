import React from 'react';
import Header from './component/header/index.jsx';
import Dashboard from './component/dashboard/index.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
      </header>
      <div className="dashboard-container">
        <Dashboard/>
      </div>
    </div>
  );
}

export default App;
