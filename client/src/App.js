import './App.css';
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Register from './pages/Register';
import Home from './pages/Home';
import Login from './pages/Login';
import Todos from './pages/Todos';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path = '/' element = {<Home />} />
          <Route exact path = '/register' element = {<Register />} />
          <Route exact path = '/login' element = {<Login />} />
          <Route exact path = '/todos' element = {<Todos />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
