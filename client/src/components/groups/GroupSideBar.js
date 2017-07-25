import React from 'react';
import { Link } from 'react-router';

const GroupSideBar = props => (
    <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
      <p>
        <Link className="btn btn-block btn-lg navy-header">Activities</Link>
        <Link to="/post-message" className="btn btn-default btn-block">Post Message here</Link>
        <Link to="/add-user-group" className="btn btn-default btn-block">Add User to Group</Link>
        <Link to="/group-users" className="btn btn-default btn-block">Group Members</Link>
        <Link to="/dashboard" className="btn btn-default btn-block"><span className="text-danger"><strong>Leave Group</strong></span></Link>
      </p>
      <hr/>
      <div className="list-group">
        <Link className="list-group-item active navy-header">
          <h5 className="list-group-item-heading text-center">Group Members</h5>
        </Link>
      </div>
      <div className="list-group">
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Jimoh Hadi</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Ekene Famous</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Muhammed Ali</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Ozi Alkanemi</h5>
        </Link>
        <Link to="/group-users" className="list-group-item btn btn-primary">
          <h5 className="list-group-item-heading"><strong><a>See all members</a></strong></h5>
        </Link>
      </div>
    </div>
);
export default GroupSideBar;
