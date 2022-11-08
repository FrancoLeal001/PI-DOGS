import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/home'
import detail from './components/details';
import DogCreate from './components/DogCreate';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    
    <Switch>
    <Route exact path='/' component = {LandingPage}/>
    <Route exact path='/home' component = {Home}/>
    <Route exact path='/dogs/:id' component= {detail}/>
    <Route exact path='/CreateDog' component = {DogCreate}/>


    </Switch>
    </div>
    </BrowserRouter>
  );
}
export default App;
