import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Home, Navbarr, Page404, Login, Signup, Profile } from './';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        console.log('props', props);
        console.log('isLoggedin', isLoggedin);
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      const user = jwtDecode(token);

      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
          type: user.type,
        })
      );
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <Router>
        <Navbarr />
        <Container fluid>
          <Row>
            <Col>
              <Switch>
                <Route path='/login' component={Login} />
                <Route path='/signup' component={Signup} />
                <PrivateRoute
                  exact
                  path='/'
                  component={Home}
                  isLoggedin={auth.isLoggedin}
                />
                <PrivateRoute
                  path='/profile'
                  component={Profile}
                  isLoggedin={auth.isLoggedin}
                />
                <Route component={Page404} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </Router>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(App);
