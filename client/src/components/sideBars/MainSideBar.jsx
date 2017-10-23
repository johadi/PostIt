import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import UserDetail from '../groups/UserDetail.jsx';

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
        <div className="main side-bar col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
          <p>
            <div className="text-center navy-header btn-lg btn-block">Quick Links</div>
            <Link to="/create-group" className="btn btn-default btn-block">
              <i className="fa fa-lg fa-plus-circle text-display" aria-hidden="true">
              </i> Create Group
            </Link>
            <Link to="/groups" className="btn btn-default btn-block">
              <i className="fa fa-users text-display" aria-hidden="true">
              </i> All My Groups
            </Link>
          </p>
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
