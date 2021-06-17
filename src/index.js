import React from 'react';
import ReactDOM from 'react-dom'; 
import Adoption from './components/adoption';

function App() {
  return (
      <div>
        <Adoption />
      </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));


