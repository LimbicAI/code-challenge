import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/LoginForm';
import Therapist from './pages/therapist';
import Client from './pages/client';
import { User } from './types/User';
import ClientDetails from './pages/client/ClientDetails';

function App() {
  const [user, setUser] = useState<User>();
  useEffect(() => {
    getUser();
  },[]);
  const getUser = () => {
    const currentUser: User = JSON.parse(sessionStorage.getItem('user')!);
    setUser(currentUser);
  };
  if (!user) {
    return <Login setUser={setUser} />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/therapist">
            <Therapist />
          </Route>
          <Route path="/client">
            <Client />
          </Route>
          <Route path="/client-details">
          <ClientDetails/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
