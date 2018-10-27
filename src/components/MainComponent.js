import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Dish from './DishdetailComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    }
  }

  sendDish() {
    let a = this.state.dishes.filter((dish) => {
      return dish.id === this.state.selectedDish;
    });
    return a[0];
  }

  render() {

    const HomePage = () => {
      return (
        <Home />
      );
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Redirect to="/home" />
        </Switch>
        {/* <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* Selecting specific dish by fitlering the main array and get one result b/c id's are unique */}
        {/* <Dish dish={this.sendDish()} /> */}
        <Footer />
      </div>
    );
  }
}

export default Main;
