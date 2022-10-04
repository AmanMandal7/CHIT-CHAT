import './App.css';
// import { Button } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/chat' element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
