import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './screens/AuthPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useSelector } from 'react-redux';
import Application from './screens/Application';

function App() {
  const user = useSelector((state) => state.user)

  return (
    <div className="App">
      <Router>
        <Routes>
          {user ? (
            <Route exact path='/' element={<Application />}>
              
            </Route>
          ) : (
            <Route path='/' element={<AuthPage />}>
              <Route index element={<SignIn />} />
              <Route path='signup' element={<SignUp />} />
            </Route>
          )}
        </Routes>
      </Router>  
    </div>
  );
}

export default App;
