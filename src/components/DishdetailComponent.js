import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
    if (dish != null) {
        return (
            <CardBody>
                <CardTitle>
                    {dish.name}
                </CardTitle>
                <CardText>
                    {dish.description}
                </CardText>
            </CardBody>
        );
    }
    else {
        return (<div></div>);
    }
}

function RenderComments({ comments }) {
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

const DishDetail = (props) => {

    let dishInfo = props.dish ? (
        <Card>
            <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
            <RenderDish dish={props.dish} />
        </Card>

    ) : (null);

    let commentInfo = props.dish ? <div><h4>Comments</h4><RenderComments comments={props.comments} /></div>
        : <div></div>;

    return (
        <div className="row">
            <div className="col-12 col-md-5 m-1">
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to='/home'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to='/menu'>Menu</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    {dishInfo}
                    {commentInfo}
                </div>
            </div>
        </div>
    );
}


export default DishDetail;