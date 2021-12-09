import React from 'react';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import { Provider } from 'react-redux'
import {Store} from './redux/store'

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
