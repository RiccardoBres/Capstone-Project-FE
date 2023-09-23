import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import RegistrationPage from './Pages/RegistrationPage';
import ProtectedRouter from './Middleware/ProtectedRoutes';
import Profile from './Pages/Profile/Profile';
import Posts from './Pages/Posts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signUp" element={<RegistrationPage />} />
        <Route path="/posts" element={<Posts />} />

        <Route element={<ProtectedRouter />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
