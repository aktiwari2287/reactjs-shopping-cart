import React from "react";
import './App.css';
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from './data.json';
import { sortByPrice } from "./util";
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: data.products,
        size: "",
        sort: ""
      }
    }

    sortProducts = (event) => {
      console.log(event.target.value);
      this.setState(sortByPrice(event.target.value, this.state.products));
    }

    filterProducts = (event) => {
      console.log(event.target.value);
      if(event.target.value === '') {
        this.setState({size: event.target.value, product: data.products})
      }
      else {
        this.setState(
          {
            size: event.target.value,
            products: data.products.filter(product => (product.availableSizes.indexOf(event.target.value)>-1))
          })
      }
    }
    render() {
      return (
        <div className="grid-container">
        <header>
            <a href="/"> My Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
                <Filter count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                ></Filter>
                <Products products={this.state.products}/>
            </div>
            <div className="sidebar">
              Cart Items
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
      );
    }
}

export default App;
