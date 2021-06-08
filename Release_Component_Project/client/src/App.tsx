import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Header_copy from "./components/Header_copy";
import Login from "./components/login";
import Register from "./components/Registration";
import './styles/Header.css'
import BookDetails from './components/Book_Details/BookDetails';
import BookList from "./components/Book_List/BookList";
import AuthorsPage from "./components/AuthorsPage";
import BooksPaginate from "./components/Book_List/BooksPaginate";
import Footer from "./components/Footer";
import Checkout from "./components/Checkout";

function App() {
  return (
    <>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <BooksPaginate></BooksPaginate>
          </Route>
          <Route exact path="/login"><Login></Login></Route>
          <Route exact path="/register"><Register></Register></Route>
          <Route exact path="/bookDetails/:paramId">
              <BookDetails></BookDetails>
          </Route>
          <Route exact path="/author/:authorName">
              <AuthorsPage></AuthorsPage>
          </Route>
          <Route exact path="/checkout">
              <Checkout></Checkout>
          </Route>
        </Switch>
        {/* <Footer></Footer> */}
      </Router>
    </>
  );
}
export default App;