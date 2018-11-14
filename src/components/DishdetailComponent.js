import React, { Component } from 'react';
import { Breadcrumb, Label, BreadcrumbItem, Button, Col, Row, Card, CardImg, CardText, CardBody, CardTitle, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSubmit = (values) => {
        console.log(values);
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button color="white" onClick={this.toggleModal}><span className="fa fa-pencil"></span>  Submit Button</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
                    <ModalHeader>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Col md={6}>
                                    <Label htmlFor="rating"><strong>Rating</strong></Label>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author"><strong>Your Name</strong></Label>
                                    <Control.text model=".author" name="author" className="form-control"
                                        validators={{
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment"><strong>Comment</strong></Label>
                                    <Control.textarea rows="6" model=".comment" name="comment" className="form-control" />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 12 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

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

function RenderComments({ comments, addComment, dishId }) {
    if (comments != null) {
        let allComments = comments.map((comment) => {
            return (
                <ul key={comment.id} className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li> -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </li>
                </ul>
            );
        });
        return (<><div>{allComments}</div><CommentForm dishId={dishId} addComment={addComment} /></>);
    }
    else {
        return (<div><CommentForm /></div>);
    }
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {

        let dishInfo = props.dish ? (
            <Card>
                <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                <RenderDish dish={props.dish} />
            </Card>

        ) : (null);

        let commentInfo = props.dish ? <div><h4>Comments</h4><RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} /></div>
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
}

export default DishDetail;