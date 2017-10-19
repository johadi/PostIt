import React from 'react';
import PropTypes from 'react-proptypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import verifyToken from '../../actions/verifyTokenAction';
import NullPage from './NullPage.jsx';

/**
 * AuthenticateUser class declaration
 */
class AuthenticateUser extends React.Component {
  /**
   * @return {void} void
   */
  componentWillMount() {
    this.props.verifyToken();
  }

  /**
   * renders component
   * @return {XML} XML
   */
  render() {
    return this.props.tokenStatus.success ?
      this.props.children : <NullPage/>;
  }
}
AuthenticateUser.propTypes = {
  tokenStatus: PropTypes.object.isRequired,
  verifyToken: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({ verifyToken }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AuthenticateUser);

