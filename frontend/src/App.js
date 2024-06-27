import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';

import ProfilePage from './Pages/ProfilePage';
import ErrorPage from './Pages/ErrorPage';
import PageProtector from './components/PageProtector';
import HomePage from './Pages/Homepage';




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/homepage' element={<PageProtector>
              <HomePage/>
          </PageProtector>}/>
        <Route path='/:id' element={<PageProtector>
              <ProfilePage/>
          </PageProtector>}/>
        <Route path='*' element={
          <PageProtector>
              <ErrorPage/>
          </PageProtector>
          }/>
      </Routes>
    </Router>
    
  );
}

export default App;
