import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { SignupForm } from './components/SignupForm';
import './App.css';
import Page from './app/login/page';
import { NoteLists } from './components/NoteLists';
import { Layout } from './components/Layout';
import TextEditor from './components/TextEditor/TextEditor';
import { CategoryPage } from './components/CategoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import { ProfilePage } from './components/ProfilePage';
import { SearchResultsPage } from './components/SearchResultsPage';

function App() {
  return (
    <div  className="loginform1"> 
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Page />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/notes" element={<ProtectedRoute><Layout><NoteLists /></Layout></ProtectedRoute>} />
        <Route path="/TextEditor" element={<ProtectedRoute><Layout><TextEditor /></Layout></ProtectedRoute>} />
        <Route path="/category" element={<ProtectedRoute><Layout><CategoryPage /></Layout></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Layout><SearchResultsPage /></Layout></ProtectedRoute>} />
      </Routes>
    </Router>
    </div>
    

    // <div>
    //   <NoteLists />
    // </div>
  );
}

export default App;