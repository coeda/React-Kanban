import React from 'react';
import CardPage from './components/CardPage';

class App extends React.Component {
  render() {
    return(
      <div>
        <CardPage cardUrl='http://localhost:3000/api' />
      </div>
    )
  }
}

export default App;

