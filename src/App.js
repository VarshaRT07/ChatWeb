import {BrowserRouter, Switch, Route,Redirect} from 'react-router-dom'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup';
import { AuthContext } from './context/AuthContext';
import { useContext } from "react";


import './App.css';

function App() {
  const {authIsReady,user}=useContext(AuthContext);


  return (
    <div className="App">

 {authIsReady && (<BrowserRouter>
      
      <Switch>
      <Route exact path="/">
        {user && <Home/>}
        {!user && <Redirect to="/"/>}
      </Route>
      <Route path="/login">
      {user && <Redirect to="/"/>}
        {!user && <Login/>}
      </Route>
      <Route  path="/signup">
        {!user && <Signup/>}
        {user && <Redirect to="/"/>}
      </Route>
      </Switch>
      </BrowserRouter>)}
    </div>
  );
}

export default App;
