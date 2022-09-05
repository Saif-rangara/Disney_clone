import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Header from './Components/Header';
import Home from './Components/Home';
import Detail from './Components/Detail';

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
        <Routes>
        <Route exact path='/' element={<Login/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/detail/:id' element={<Detail/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
