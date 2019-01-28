import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchBar from "./SearchBar";
import Results from "./Results";
import ShowDetail from "./ShowDetail";
import ErrorPage from "./ErrorPage";

class App extends Component {
  render() {
    return (
      <Router>
          <div>
              <Switch>
                <Route path="/content/:omdbID" exact component={()=>null} />
                <Route component={()=><SearchBar/>}/>
              </Switch>
              <Switch>
              <Route path="/" exact component={() => null} />
              <Route path="/results" exact component={Results} />
              <Route path="/content/:omdbID" exact component={ShowDetail} />
              <Route component={ErrorPage} />
              </Switch>
          </div>
      </Router>
    );
  }
}

export default App;