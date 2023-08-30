import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './Pages/Homepage';
import BeachOptions from './Pages/SpotSearcher/BeachOptions';
import RegistrationPage from './Pages/RegistrationPage';
import ProtectedRouter from './Middleware/ProtectedRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signUp" element={<RegistrationPage />} />

        <Route element={<ProtectedRouter />}>
          <Route path="/beachOptions" element={<BeachOptions />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
