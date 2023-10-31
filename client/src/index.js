import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route,Routes, Link } from 'react-router-dom';
import { LoginForm, RegistrationForm } from '../src/components/LoginForm';
import App from './App';

function Root() {
  return (
    <React.StrictMode>
      <BrowserRouter>
      <div className="container" style={{maxWidth:"1152px"}}>
        <div className="row">
          
          <div className="col-md-6">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/chat" element={<App disabled={false} />} />
            <Route path="/chat/:type/:receiver/:receiverId" element={<App  disabled={true} />} />
            <Route index element={<LoginForm />} />
          </Routes>
          </div>
        </div>
      </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
