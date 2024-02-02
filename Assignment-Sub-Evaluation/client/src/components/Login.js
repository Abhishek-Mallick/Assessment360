import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, clearAuthState } from '../actions/auth';
import { Form, Button, Card, Col, Row, Alert } from 'react-bootstrap';
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));

      this.setState({
        email: '',
        password: '',
      });
    }
  };

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }
  render() {
    const { inProgress, error, isLoggedin } = this.props.auth;
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (isLoggedin) {
      return <Redirect to={from} />;
    }

    return (
      <Row>
        <Col xs={12} md={{ span: 6, offset: 3 }}>
          <Card style={{ marginTop: '5rem' }}>
            <Card.Body>
              <Form>
                <Card.Title>Log In</Card.Title>
                {error && (
                  <Alert show={error !== null} variant={'danger'}>
                    {error}
                  </Alert>
                )}

                <Form.Group controlId='formBasicEmail'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Email'
                    required
                    // ref={this.emailInputRef}
                    onChange={this.handleEmailChange}
                    value={this.state.email}
                  />
                  <Form.Text className='text-muted'>
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId='formBasicPassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    required
                    // ref={this.passwordInputRef}
                    onChange={this.handlePasswordChange}
                    value={this.state.password}
                  />
                </Form.Group>
                <Col xs={12} md={{ offset: 4 }}>
                  {inProgress ? (
                    <Button
                      size='lg'
                      onClick={this.handleFormSubmit}
                      disabled={inProgress}
                    >
                      Logging in...
                    </Button>
                  ) : (
                    <Button
                      size='lg'
                      variant='primary'
                      type='submit'
                      onClick={this.handleFormSubmit}
                      disabled={inProgress}
                    >
                      Log In
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

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);
