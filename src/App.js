import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './screens/AuthPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<AuthPage />}>
            <Route index element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
