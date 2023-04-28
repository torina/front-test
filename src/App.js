import React from 'react'
import theme from './theme'
import './App.css';
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/pages/auth/index';
import Profile from './components/pages/profile/index';
import Auth from './components/auth/auth';
import Projects from './components/pages/projects';
import CreateProject from './components/pages/createProject';
import Dashboard from './components/pages/dashboard';
import Marketplace from './components/pages/marketplace';
import ProjectOverview from './components/pages/projectOverview';
import Volunteer from './components/pages/volunteer';
import Chat from './components/pages/chat';
import Donating from './components/pages/donating';
import { MessageProvider } from './contexts/MessageContext';
import Terms from './components/pages/terms';
import Privacy from './components/pages/privacy';
import PaymentPage from './components/pages/paymentPage';
import Registration from './components/pages/auth/registration/registrationForm';
import ProjectPreview from './components/pages/projectPreview';
import AdminLogin from './components/pages/adminPages/auth';
import AdminDashboard from './components/pages/adminPages';

function App() {


  const [socketIo, setSocketIo] = React.useState(null);
  return (
    <div className="App">
      <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
        redirectUri={window.location.origin}
      >
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Auth setSocketIo={setSocketIo}>
            <MessageProvider socketIo={socketIo}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/admin/auth" element={<AdminLogin />} />
                <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
                <Route exact path="/registration" element={<Registration />} />
                <Route exact path="/auth/registration" element={<Login window={'signUp'} />} />
                <Route exact path="/auth/resetPassword" element={<Login window={'resetPassword'} />} />
                <Route exact path="/auth/confirmEmail" element={<Login window={'confirmPage'} />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/projects" element={<Projects />} />
                <Route exact path="/create_project" element={<CreateProject />} />
                <Route exact path="/project/:id" element={<ProjectOverview />} />
                <Route exact path="/discoverprojects" element={<Marketplace />} />
                <Route exact path="/collections" element={<Marketplace />} />
                <Route exact path="/volunteer/:id" element={<Volunteer />} />
                <Route exact path="/donation/:id" element={<Donating />} />
                <Route exact path="/chat" element={<Chat />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/terms" element={<Terms />} />
                <Route exact path="/privacy" element={<Privacy />} />
                <Route exact path="/payments" element={<PaymentPage />} />
                <Route exact path="/preview/:id" element={<ProjectPreview />} />
                {/* <Route exact path="/companyInfo/:type/:slug/:id" element={<CompanyInfo themeChanged={themeChanged} setThemeChanged={setThemeChanged} />} />
              <Route path="*" element={<Home themeChanged={themeChanged} setThemeChanged={setThemeChanged} />} /> */}
                </Routes>
              </MessageProvider>
            </Auth>
          </ThemeProvider>
        </BrowserRouter>
      </Auth0Provider>
    </div>
  );
}

export default App;
