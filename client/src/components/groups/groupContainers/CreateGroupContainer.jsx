import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'react-proptypes';
import NullPage from '../NullPage.jsx';
import CreateGroup from '../CreateGroup.jsx';
import Page from '../Page.jsx';

/**
 * CreateGroupContainer class declaration
 */
class CreateGroupContainer extends React.Component {
  /**
   * Renders component
   * @return {XML} XML
   */
  render() {
    return this.props.tokenStatus.success ?
      <Page>
        <CreateGroup/>
      </Page> : <NullPage/>;
  }
}
CreateGroupContainer.propTypes = {
  tokenStatus: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  tokenStatus: state.verifyTokenReducer,
});
export default connect(mapStateToProps)(CreateGroupContainer);

