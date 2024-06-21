import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Feedpage from './Pages/Feedpage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/feeds' element={<Feedpage/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
