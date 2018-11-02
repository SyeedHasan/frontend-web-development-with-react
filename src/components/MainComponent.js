import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

class Main extends Component {
  constructor(props) {
    super(props);
  }

  sendDish() {
    let a = this.props.dishes.filter((dish) => {
      return dish.id === this.props.selectedDish;
    });
    return a[0];
  }

  render() {

    const HomePage = () => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotions={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />

      );
    }

    const DishWithId = ({match}) => {
      //Three props are passed. match, location and history.
      // Convert to base 10 integer
      return (
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]} 
          comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} 
        />

      );
    }

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
          <Route exact path="/contactus" component={Contact} ></Route>
          <Redirect to="/home" />
        </Switch>
        {/* <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)} /> */}
        {/* Selecting specific dish by fitlering the main array and get one result b/c id's are unique */}
        {/* <Dish dish={this.sendDish()} /> */}
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));

