import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Teacher, Student } from './';
import { ToastContainer, toast } from 'react-toastify';
class Home extends Component {
  componentDidMount() {
    toast('Welcome !');
  }

  render(props) {
    const { type } = this.props;

    return <div><ToastContainer />{type === 'teacher' ? <Teacher /> : <Student />}</div>;
  }
}
function mapStateToProps(state) {
  return {
    type: state.auth.user.type,
  };
}
export default connect(mapStateToProps)(Home);
