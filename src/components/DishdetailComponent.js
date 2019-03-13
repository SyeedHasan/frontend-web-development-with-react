import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Row, Col, Label, Button, Card, CardImg, CardText, CardBody, CardTitle, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const minLength = (len) => (val) => !(val) || (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmitChange = (values) => {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment)
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>   

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitChange(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Ratings</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="1"
                                        className="form-control" >

                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                                                     
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={5}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }} />
                                                                     
                                    <Errors 
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be lesser than 15 characters'
                                        }}
                                    />
                                </Col>
                            </Row>


                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        className="form-control"
                                        rows="6"
                                    />

                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{size:10}}>
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

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null) {
        let allComments = comments.map((comment) => {
            return (
                <ul key={comment.id} className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li> -- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))} </li>
                </ul>
            );
        });
        allComments.push(<CommentForm dishId={dishId} postComment={postComment} />);
        return allComments;
    }
    else {
        return (<div><CommentForm dishId={dishId} postComment={postComment} /></div>);
    }
}

const DishDetail = (props) => {
    if(props.isLoading) {
        return (<div className="container">
            <div className="row ">
                <Loading />
            </div>
            </div>
            )
    }
    else if(props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    // this clause might be problematic!!
    let dishInfo = props.dish ? (
        <Card>
            <CardImg width="100%" src={baseUrl + props.dish.image} alt={props.dish.name} />
            <RenderDish dish={props.dish} />
        </Card>

    ) : (null);

    let commentInfo = props.dish ? <div><h4>Comments</h4><RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id} /></div>
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