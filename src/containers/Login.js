import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { SESSION_ACTIONS } from '../actions/types';

import LoginForm from '../components/LoginForm';

function Login({ push, setUserDetails }) {
  return <LoginForm push={push} setUserDetails={setUserDetails} />;
}

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserDetails: userDetails =>
      dispatch({
        type: SESSION_ACTIONS.SET_USER_DETAILS,
        payload: userDetails,
      }),
    push: path => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
