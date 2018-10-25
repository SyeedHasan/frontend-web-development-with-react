import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class Dish extends Component {

    renderDish(dish) {
        if(dish!= null){
            return (
                <CardBody>
                    <CardTitle>
                        {this.props.dish.name}    
                    </CardTitle>    
                    <CardText>
                        {this.props.dish.description}
                    </CardText>
                </CardBody>
            );
        }
        else {
            return (<div></div>);
        }
    }

    renderComments(comments) {
        if(comments != null){
            console.log(comments);
            const allComments = comments.map( (comment) => {
                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li> -- {comment.author} , {comment.date} </li>
                    </ul>   
                );
            });
            return allComments;
        }
        else {
            return ( <div></div> );
        }
    }

    render(){

        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                        {this.renderDish(this.props.dish)}      
                    </Card>
                </div> 
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
        );
    }

}

export default Dish;