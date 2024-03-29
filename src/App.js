import React from "react";
import './App.css';
import Cart from "./components/Cart";
import Filter from "./components/Filter";
import Products from "./components/Products";
import data from './data.json';
import { sortByPrice } from "./util";
class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        products: data.products,
        cartItems: [],
        size: "",
        sort: ""
      }
    }

    addToCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      let alreadyInCart = false;
      cartItems.forEach((cartItem) => {
        if(cartItem._id === product._id) {
          cartItem.count++;
          alreadyInCart = true;
        }
      });
      if(!alreadyInCart) {
        cartItems.push({...product, count: 1})
      }
      this.setState({cartItems});
    }
    sortProducts = (event) => {
      const sort=event.target.value;
      const products = sortByPrice(sort, this.state.products);

      console.log('sorted products', products);
      this.setState((state) => ({sort, products}));
    }

    filterProducts = (event) => {
      console.log("value is " + event.target.value);
      if(event.target.value === 'ALL') {
        console.log("inside if")
        this.setState({size: event.target.value, products: data.products})
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
                <Products products={this.state.products} addToCart={this.addToCart}/>
            </div>
            <div className="sidebar">
                <Cart cartItems={this.state.cartItems}/>
            </div>
          </div>
        </main>
        <footer>All right is reserved.</footer>
      </div>
      );
    }
}

export default App;
