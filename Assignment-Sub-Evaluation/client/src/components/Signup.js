import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signup, clearAuthState } from '../actions/auth';
import { Form, Button, Card, Col, Row, Alert } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      type: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();

    const { email, password, name, type } = this.state;

    if (email && password && name && type) {
      toast(`Welcome ${name}  !`);
      this.props.dispatch(signup(email, password, name, type));
    }
    this.setState({
      email: '',
      password: '',
      name: '',
      type: '',
    });
  };

  render() {
    const { inProgress, error, success } = this.props.auth;
    return (
      <Row>
        <ToastContainer />
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: '5rem' }}>
            <Card.Body>
              <Form>
                <Card.Title>Register</Card.Title>

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
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder='Name'
                    type='text'
                    required
                    onChange={(e) =>
                      this.handleInputChange('name', e.target.value)
                    }
                    value={this.state.name}
                  />
                </Form.Group>
                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder='Email'
                    type='email'
                    required
                    onChange={(e) =>
                      this.handleInputChange('email', e.target.value)
                    }
                    value={this.state.email}
                  />
                </Form.Group>

                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder='Password'
                    type='password'
                    required
                    onChange={(e) =>
                      this.handleInputChange('password', e.target.value)
                    }
                    value={this.state.password}
                  />
                </Form.Group>
                <Form.Group controlId='exampleForm.ControlSelect1'>
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as='select'
                    required
                    onChange={(e) =>
                      this.handleInputChange('type', e.target.value)
                    }
                    value={this.state.type}
                  >
                    <option value='' selected disabled hidden>
                      Select Type
                    </option>
                    <option value='teacher'>teacher</option>
                    <option value='student'>student</option>
                  </Form.Control>
                </Form.Group>

                <Col xs={12} md={{ offset: 4 }}>
                  {inProgress ? (
                    <Button
                      onClick={this.onFormSubmit}
                      disabled={inProgress}
                      size='lg'
                    >
                      Checking status...
                    </Button>
                  ) : (
                    <Button
                      onClick={this.onFormSubmit}
                      disabled={inProgress}
                      size='lg'
                    >
                      Register
                    </Button>
                  )}
                </Col>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Signup);
