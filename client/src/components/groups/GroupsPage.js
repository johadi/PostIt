// import React from 'react';
// import { Link } from 'react-router';
// import '../../build/static/styles/group-custom.scss';
// import GroupHeader from '../headers/GroupHeader';
// import SideBar from './SideBar';
// import Groups from './Groups';
// import groupBackGround from '../../utils/groupPagesBackground';
//
// export default class GroupsPage extends React.Component {
//   componentDidMount() {
//     groupBackGround();
//   }
//   render() {
//     const {Groups,fullname} = this.props.groupsUserBelongsTo;
//     return (
//         <div className="container">
//           <GroupHeader/>
//           <div id="group-body" className="row">
//             <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
//               <div className="panel-body">
//                 <h2>{fullname}</h2>
//                 <div className="row">
//                   <Groups/>
//                 </div>
//               </div>
//             </div>
//             <SideBar userGroups={Groups}/>
//           </div>
//         </div>
//     );
//   }
// }

import React from 'react';
import { Link } from 'react-router';
import '../../build/static/styles/group-custom.scss';
import GroupHeader from '../headers/GroupHeader';
import SideBar from './SideBar';
import AllGroups from './Groups';
import groupBackGround from '../../utils/groupPagesBackground';

export default class GroupsPage extends React.Component {
  componentDidMount() {
    groupBackGround();
  }
  render() {
    const {Groups,fullname} = this.props.groupsUserBelongsTo;
    return (
        <div className="container">
          <GroupHeader/>
          <div id="group-body" className="row">
            <div className="col-md-push-1 col-md-7 col-sm-12 col-xs-12 panel panel-default" id="message-board-panel">
              <div className="panel-body">
                <div className="row">
                  <AllGroups userGroups={Groups}/>
                </div>
              </div>
            </div>
            <SideBar userGroups={Groups}/>
          </div>
        </div>
    );
  }
}

