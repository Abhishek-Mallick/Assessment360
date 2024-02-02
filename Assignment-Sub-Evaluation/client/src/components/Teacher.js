import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getAssignments,
  create,
  getmyAssignments,
  clearAuthState,
  getAllStudents,
} from '../actions/assignment';
import { Form, Button, Card, Col, Row, Alert } from 'react-bootstrap';
import { AssignmentStatus } from './';
import { ToastContainer, toast } from 'react-toastify';
class Teacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }
  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const { title, description } = this.state;

    if (title && description) {
      toast('Assignment Created !!');
      this.props.dispatch(create(title, description, this.props.auth.user._id));
    }
    this.setState({
      title: '',
      description: '',
    });
  };

  componentDidMount() {
    this.props.dispatch(getAssignments());
    this.props.dispatch(getmyAssignments(this.props.auth.user._id));
    this.props.dispatch(getAllStudents());
  }
  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render(props) {
    const { filteredAssign, success } = this.props.assignments;

    return (
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: '5rem' }}>
            <Card.Body>
              <Form>
                <Card.Title>Create Assignment</Card.Title>
                {success && (
                  <Alert show={success !== null} variant={success}>
                    {success}
                  </Alert>
                )}
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Title'
                    required
                    onChange={(e) => this.handleChange('title', e.target.value)}
                    value={this.state.title}
                  />
                </Form.Group>
                <Form.Group controlId='exampleForm.ControlTextarea1'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as='textarea'
                    rows={4}
                    placeholder='Add your Problem Statements Here !!'
                    required
                    onChange={(e) =>
                      this.handleChange('description', e.target.value)
                    }
                    value={this.state.description}
                  />
                </Form.Group>
                <Col xs={12} md={{ offset: 4 }}>
                  <Button
                    variant='secondary'
                    onClick={this.onFormSubmit}
                    size='lg'
                  >
                    Create
                  </Button>
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Row>
          <Col xs={12} md={{ span: 14, offset: 1 }}>
            {filteredAssign.map((assign) => {
              return (
                <Card style={{ marginTop: '2rem', width: '65rem' }}>
                  <Card.Header>Title: {assign.title}</Card.Header>
                  <Card.Body>
                    <Card.Text>Description: {assign.description} </Card.Text>
                    <AssignmentStatus assign={assign} />
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Row>
    );
  }
}
function mapStateToProps(state) {
  return {
    assignments: state.assignment,
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Teacher);
