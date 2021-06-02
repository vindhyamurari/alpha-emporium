import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/login";
import Register from "./components/Registration";
import './styles/Header.css'
import {Provider} from 'react-redux'
import store from './Reducers/redux-store'
import Home from './components/Home'

function App() {
  return (
    <>
    <Provider store={store}> 
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/"><Home></Home></Route>
          <Route exact path="/login"><Login></Login></Route>
          <Route exact path="/register"><Register></Register></Route>
        </Switch>
      </Router>
      </Provider>
    </>
  );
}
export default App;