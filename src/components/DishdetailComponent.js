import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Form, Row, Col, Label } from 'reactstrap';
import { Card, CardImg, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required = (val) => val&&val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length>=len);
const isNumber = (val) => !isNaN(Number(val));
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen : !this.setState.isModalOpen
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="ml-auto" navbar>
                    <div>
                        <Button outline onClick={this.toggleModal}>
                            <span className=""><i class="fa fa-pencil"></i> Submit Comment</span>
                        </Button>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleLogin}>
                            <Row className="form-group m-1">
                                <Label htmlFor="username" md={12}> Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".contactType" name="contactType" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group m-1">
                                <Label htmlFor="password" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".lastname" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group m-1">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message" className="form-control" rows="12"></Control.textarea>
                                </Col>
                            </Row>

                            <Row className="form-group m-1" md={12}>
                                <Button type="submit" value="submit" className="bg-primary">Submit</Button>
                            </Row>
                           
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

function RenderComments({comments}) {
    if (comments == null) {
        return (<div></div>)
    }
    const usercomment = comments.map(comment => {
        return (
            <div key={comment.id} className="container">
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, &nbsp;
                          {new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: '2-digit'}).format(new Date(comment.date))}
                    </p>
                </li>
            </div>
        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                {usercomment}
            </ul>
            <CommentForm />
        </div>
    )
}

function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

const Dishdetail = (props) => {
    if (props.dish == null) {
        return (<div></div>)
    }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'> Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments} />
            </div>
        </div>
    )
}

export default Dishdetail;