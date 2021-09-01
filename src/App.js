import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <h1> Country Search </h1>
        <SearchBar />
        </div>
      </header>
    </div>
  );
}

export default App;
