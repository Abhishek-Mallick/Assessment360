import React, { Component } from 'react';
import {
  getAllStudents,
  evaluate,
  getAssignments,
} from '../actions/assignment';
import {
  Form,
  Button,
  Card,
  Col,
  Row,
  Alert,
  ListGroup,
} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
class AssignmentStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: [],
      notsubmit: [],
      grade: '',
    };
  }

  componentDidMount() {
    this.props.dispatch(getAllStudents());
    this.props.dispatch(getAssignments());
    this.handleFilter();
  }

  handleFilter = () => {
    console.log('this.props&&', this.props);
    this.setState({
      submit: null,
      notsubmit: null,
    });
    let sub = this.props.assign.students;
    let all = this.props.assignment.students;

    all = all.filter(function (item) {
      for (var i = 0, len = sub.length; i < len; i++) {
        console.log('subi', item);
        if (sub[i].id._id === item._id) {
          return false;
        }
      }
      return true;
    });

    this.setState({
      submit: sub,
      notsubmit: all,
    });
  };

  handleInputChange = (value, sid, aid, uid) => {
    this.setState({
      grade: value,
    });
    if (value && sid && aid) {
      toast('Assignment Evaluated !!');
      this.props.dispatch(evaluate(aid, sid, value, uid));
    }
  };

  render(props) {
    return (
      <div>
        <div>
          <Card.Title>Submitted Students: </Card.Title>
          <ListGroup variant='flush'>
            {this.state.submit.map((std) => {
              return (
                <ListGroup.Item>
                  <Card.Text>Name:{std.id.name}</Card.Text>
                  <Card.Text>EmailId: {std.id.email}</Card.Text>
                  File uploaded:
                  <Button
                    variant='link'
                    href={'http://localhost:8000' + std.upload}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Download
                  </Button>
                  <Form.Group controlId='exampleForm.ControlSelect1'>
                    <Form.Label>Grade</Form.Label>
                    <Form.Control
                      as='select'
                      required
                      onChange={(e) =>
                        this.handleInputChange(
                          e.target.value,
                          std.id._id,
                          this.props.assign._id,
                          this.props.assign.owner
                        )
                      }
                      value={std.status}
                    >
                      <option value='' selected>
                        Evaluate
                      </option>
                      <option value='A'>A</option>
                      <option value='B'>B</option>
                      <option value='C'>C</option>
                    </Form.Control>
                  </Form.Group>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>

        <div>
          <Card.Title>Not Submitted Students: </Card.Title>
          <ListGroup>
            {this.state.notsubmit.map((std) => {
              return (
                <ListGroup.Item>
                  <div>Name:{std.name}</div>
                  <div>EmailId: {std.email}</div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    assignment: state.assignment,
  };
}
export default connect(mapStateToProps)(AssignmentStatus);
