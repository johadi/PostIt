import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import UserDetail from '../groups/UserDetail';

/**
 * MainSideBar class declaration
 * @class MainSideBar
 * @extends {React.Component}
 */
export class MainSideBar extends React.Component {
  /**
   * Renders the component
   * @return {XML} JSX
   */
  render() {
    return (
        <div className="main-sidebar">
          <div>
            <div className="text-center navy-header btn-lg btn-block">Quick Links</div>
            <Link to="/create-group" className="btn btn-default btn-block">
              <i className="fa fa-lg fa-plus-circle text-display" aria-hidden="true">
              </i> Create Group
            </Link>
            <Link to="/groups" className="btn btn-default btn-block">
              <i className="fa fa-users text-display" aria-hidden="true">
              </i> All My Groups
            </Link>
          </div>
          <hr/>
          <UserDetail userDetail={this.props.tokenStatus.userDetail} />
        </div>
    );
  }
}
MainSideBar.propTypes = {
  tokenStatus: PropTypes.object
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer
});
export default connect(mapStateToProps)(MainSideBar);
