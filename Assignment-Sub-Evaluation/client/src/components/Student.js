import React, { Component } from 'react';
import { getAssignments, submit } from '../actions/assignment';
import { connect } from 'react-redux';
import { Grade } from './';
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Alert,
  ListGroup,
  Badge,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: null,
      submit: [],
      notsubmit: [],
    };
  }
  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });
  };

  onClickHandler = (e, aid) => {
    if (this.state.selectedFile !== null) {
      toast('File Uploaded !');
      const data = new FormData();
      data.append('file', this.state.selectedFile);
      data.append('aid', aid);
      this.props.dispatch(submit(data));
    }
    e.target.files = null;
    this.setState({ selectedFile: null });
  };

  handleFilter = () => {
    console.log('this.props&&', this.props);
    let self = this;
    this.setState({
      submit: null,
      notsubmit: null,
    });
    let sub = [];
    let not = [];
    let all = this.props.assignments.assignments;

    all.forEach(function (item) {
      let flag = false;
      for (let i = 0, len = item.students.length; i < len; i++) {
        if (item.students[i].id._id === self.props.auth.user._id) {
          sub.push(item);
          flag = true;
        }
      }
      if (!flag) {
        not.push(item);
      }
    });

    this.setState({
      submit: sub,
      notsubmit: not,
    });
  };

  componentDidMount() {
    this.props.dispatch(getAssignments());
    this.handleFilter();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.handleFilter();
    }
  }

  render(props) {
    const { notsubmit, submit } = this.state;

    return (
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: '5rem', width: '40rem' }}>
            <Card.Header>UPCOMING ASSIGNMENTS</Card.Header>
            <Card.Body>
              <ListGroup variant='flush'>
                {notsubmit.map((assign) => {
                  return (
                    <ListGroup.Item>
                      <Card.Title>Title: {assign.title}</Card.Title>
                      <Card.Text>Description: {assign.description}</Card.Text>
                      <Card.Text>Teacher Name: {assign.owner.name}</Card.Text>
                      <Card.Text>Teacher Email: {assign.owner.email}</Card.Text>
                      <Form.Group controlId='formBasicEmail'>
                        <Form.Label>Upload Assignment</Form.Label>
                        <Form.Control
                          type='file'
                          name='file'
                          onChange={this.onChangeHandler}
                        />
                      </Form.Group>
                      <Button
                        variant='outline-primary'
                        onClick={(e) => this.onClickHandler(e, assign._id)}
                      >
                        Upload
                      </Button>

                      <Grade assign={assign} user={this.props.auth.user._id} />
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: '5rem', width: '40rem' }}>
            <Card.Header>SUBMITTED ASSIGNMENTS</Card.Header>

            <ListGroup.Item>
              {submit.map((assign) => {
                return (
                  <ListGroup.Item>
                    <Card.Title>Title: {assign.title}</Card.Title>
                    <Card.Text>Description: {assign.description}</Card.Text>
                    <Card.Text>Teacher Name: {assign.owner.name}</Card.Text>
                    <Card.Text>Teacher Email: {assign.owner.email}</Card.Text>
                    <div>
                      <Grade assign={assign} user={this.props.auth.user._id} />
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup.Item>
          </Card>
        </Col>
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
export default connect(mapStateToProps)(Student);
