import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import AddProduct from './component/addProduct/addProduct';
import Home from './component/home/home'
import EditProduct from './component/editProduct/editProduct';

function App() {
  return (
    <div className="App">
     <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/addProduct" component={AddProduct} />
            <Route exact path="/editProduct" component={EditProduct} />
        </Switch>
    </div>
  );
}

export default App;
