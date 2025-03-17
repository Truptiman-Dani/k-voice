import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Config from './pages/Config';
import Talk from './pages/Talk';
import UseCases from './pages/UseCases';
import Documentation from './pages/Documentation';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import SpeechToTextComponent from './pages/Transcript';
import QuestionRecognitionComponent from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/config" element={<Config />} />
        <Route path="/talk" element={<Talk />} />
        <Route path="/usecases" element={<UseCases />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/test" element={<SpeechToTextComponent />} />
        <Route path="/chat" element={<QuestionRecognitionComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
