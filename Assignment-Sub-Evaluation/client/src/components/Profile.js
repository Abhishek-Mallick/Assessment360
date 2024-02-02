import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editUser, clearAuthState } from '../actions/auth';
import { Form, Button, Card, Col, Row, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      password: '',
      editMode: false,
    };
  }

  handleChange = (fieldName, val) => {
    this.setState({
      [fieldName]: val,
    });
  };

  handleSave = () => {
    const { password, name } = this.state;
    const { user } = this.props.auth;
    if (name && password) {
      toast('Profile updated !!');
      this.props.dispatch(editUser(name, password, user._id));
    }

    this.setState({ editMode: false, name: name, password: '' });
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  render() {
    const { user, error, success } = this.props.auth;
    const { editMode } = this.state;
    return (
      <Row>
        <ToastContainer />
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: '5rem', width: '30rem' }}>
            <Card.Img
              variant='top'
              src='https://www.flaticon.com/svg/static/icons/svg/3237/3237472.svg'
              alt='user-dp'
              height='100px'
              width='180px'
            />
            <Card.Body>
              {error && (
                <Alert show={error !== null} variant={'danger'}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert show={success !== null} variant={success}>
                  {success}
                </Alert>
              )}

              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email address:</Form.Label>
                <h5>{user.email}</h5>
              </Form.Group>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Name</Form.Label>
                {editMode ? (
                  <Form.Control
                    type='text'
                    onChange={(e) => this.handleChange('name', e.target.value)}
                    value={this.state.name}
                  />
                ) : (
                  <h5>{user.name}</h5>
                )}
              </Form.Group>

              {editMode && (
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type='password'
                    onChange={(e) =>
                      this.handleChange('password', e.target.value)
                    }
                    value={this.state.password}
                  />
                </Form.Group>
              )}

              {editMode ? (
                <Button onClick={() => this.handleSave()}>Save</Button>
              ) : (
                <Button onClick={() => this.handleChange('editMode', true)}>
                  Edit profile
                </Button>
              )}

              {editMode && (
                <Button
                  variant='link'
                  onClick={() => this.handleChange('editMode', false)}
                >
                  Go back
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Profile);
