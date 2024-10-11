import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import UserDetail from './pages/userlist/UserDetail';
import UserList from './pages/userlist/UserList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/viewuser/:uId" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
