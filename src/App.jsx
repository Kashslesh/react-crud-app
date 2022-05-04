import React from 'react';
import './App.css';
import SectionsForm from './Components/Sections/SectionsForm';
import SectionsItems from './Components/Sections/SectionsItems';

function App() {
  return (
    <div className="App">
      <main>
        <SectionsForm />
        <SectionsItems />
      </main>
    </div>
  );
}

export default App;
