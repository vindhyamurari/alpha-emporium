import React, { ReactElement } from "react";
import { Link, useHistory } from "react-router-dom";
import '../styles/Header.css'
interface Props {}

export default function Header({}: Props): ReactElement {
  let history = useHistory();
  const logout = () => {
    history.push("/");
  };
  return (
    <nav className="navbar navbar-expand-md navbar my-nav-bar">
        <h6 className="navbar-brand-titleOne">Alpha Emporium</h6>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav navbar-right">
            <select
              id="displayOptions"
              className="btn btn-white select-options"
              style={{ color: "#800020" }}
              defaultValue="search"
            >
              <option value="search" disabled>
                Select Search Option
              </option>
              <option value="id" style={{ color: "#800020" }}>
                Search by ID
              </option>
              <option value="title" style={{ color: "#800020" }}>
                Search by Title
              </option>
              <option value="author" style={{ color: "#800020" }}>
                Search by Author
              </option>
              <option value="rating" style={{ color: "#800020" }}>
                Search by Rating
              </option>
              <option value="price" style={{ color: "#800020" }}>
                Search by Price
              </option>
            </select>
            <form className="seacrh-form" style={{display:"inline-block"}}>
              <input
                style={{height:'2vw',display:"inline-block"}}
                className="search-from-input"
                id="searchButton"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
              style={{height:'2.3vw',textAlign:'center',display:"inline-block",color:'#800020',backgroundColor:'white',border:'none' }}
                className="search-from-btn"
                type="button"
              >
               <i className="fa fa-search"  style={{display:"inline-block"}} aria-hidden="true"></i>
              </button>
            </form>
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/" style={{color:'#800020'}}>
                  Books
                </Link>
              </li>
              <li>
                 <button style={{color:'#800020',backgroundColor:'white',border:'none',marginTop:'0.6vw'  }} >
                      Logout
                    </button>
                  </li>
                  <li className="nav-item active" >
                    <Link className="nav-link" to="/register" style={{color:'#800020'}}>
                      Register
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login" style={{color:'#800020'}}>
                      Login
                    </Link>
                  </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}
