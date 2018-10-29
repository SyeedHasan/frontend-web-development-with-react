import React, { Component } from 'react';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Dish from './DishdetailComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';


import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    }
  }

  sendDish() {
    let a = this.state.dishes.filter((dish) => {
      return dish.id === this.state.selectedDish;
    });
    return a[0];
  }

  sendProperProps = (val) => {
    let a;
    console.log(val);
    a = val.filter((value) => {
      return value.featured;
    });
    return a[0];
  }

  render() {
    const HomePage = () => {
      return (
        <Home
          dish={() => {this.sendProperProps(this.state.dishes) }}
          promotions={() => this.sendProperProps(this.state.promotions)}
          leader={() => this.sendProperProps(this.state.leader)}
        />
      );
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route exact path="/contactus" component={Contact} ></Route>
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

    //  promotions={this.state.promotions.filter((promo) => promo.featured)[0]} 
    //       leader={this.state.leaders.filter((leader) => leader.featured)[0]}  
    //  dish={() => { return this.sendProperProps(this.state.dishes)}}
    //       promotions={this.sendProperProps(this.state.promotions)}
    //       leader={this.sendProperProps(this.state.leader)} 

    // dish={() => this.state.dishes.filter((dish) => dish.featured)[0]}
    // promotions={() =>this.state.promotions.filter((promo) => promo.featured)[0]} 
    // leader={() => this.state.leaders.filter((leader) => leader.featured)[0]} 

