import React from 'react';
import './global.css';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom"
import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthenticationProvider from "./contexts/authentication-provider";
import RequireAuthentication from "./contexts/require-authentication";
import CustomNavbar from "./components/CustomNavbar";
import AlertProvider from "./contexts/alert-provides";
import Routes from "./routes";

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Header />
            <AuthenticationProvider>
                <RequireAuthentication>
                    <CustomNavbar />
                    <AlertProvider>
                        <Routes />
                    </AlertProvider>
                </RequireAuthentication>
            </AuthenticationProvider>
        <Footer />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
