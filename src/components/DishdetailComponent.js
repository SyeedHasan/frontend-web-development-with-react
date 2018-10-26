import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class Dish extends Component {

    renderDish(dish) {
        if (dish != null) {
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
        if (comments != null) {
            const allComments = comments.map((comment) => {
                return (
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li> -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </li>
                    </ul>
                );
            });
            return allComments;
        }
        else {
            return (<div></div>);
        }
    }

    render() {

        let dishInfo = this.props.dish ? (
            <Card>
                <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />
                {this.renderDish(this.props.dish)}
            </Card>

        ) : (null);

        let commentInfo = this.props.dish ? this.renderComments(this.props.dish.comments) : <div></div>;

        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <div className="container">
                        {dishInfo}
                    </div>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentInfo}
                </div>
            </div>
        );
    }

}

export default Dish;