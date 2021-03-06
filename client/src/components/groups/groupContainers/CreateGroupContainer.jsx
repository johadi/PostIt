import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import NullComponent from '../NullComponent';
import CreateGroup from '../CreateGroup';
import Page from '../Page';

/**
 * CreateGroupContainer class declaration
 * @class CreateGroupContainer
 * @extends {React.Component}
 */
class CreateGroupContainer extends React.Component {
  /**
   * Renders component
   * @return {XML} JSX
   */
  render() {
    return this.props.tokenStatus.success ?
      <Page>
        <CreateGroup/>
      </Page> : <NullComponent/>;
  }
}
CreateGroupContainer.propTypes = {
  tokenStatus: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
});
export default connect(mapStateToProps)(CreateGroupContainer);

