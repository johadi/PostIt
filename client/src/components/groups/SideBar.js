import React from 'react';
import { Link } from 'react-router';

const SideBar = props => (
      <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
        <p>
          <a className="btn navy-header btn-lg btn-block">Quick Links</a>
          <Link to="/create-group" className="btn btn-default btn-block">Create Group</Link>
          <Link to="/groups" className="btn btn-default btn-block">All My Groups</Link>
        </p>
        <hr/>
        <div className="list-group">
          <Link className="list-group-item active navy-header">
            <h5 className="list-group-item-heading">Your top groups</h5>
          </Link>
        </div>
        <div className="list-group">
          <Link to="/group-messages" className="list-group-item">
            <h5 className="list-group-item-heading">Andela</h5>
          </Link>
          <Link to="/group-messages" className="list-group-item">
            <h5 className="list-group-item-heading">Bootcamp 24</h5>
          </Link>
          <Link to="/group-messages" className="list-group-item">
            <h5 className="list-group-item-heading">Jimoh Family</h5>
          </Link>
          <Link to="/group-messages" className="list-group-item">
            <h5 className="list-group-item-heading">Johadi Club</h5>
          </Link>
          <Link to="/groups" className="list-group-item btn btn-primary">
            <h5 className="list-group-item-heading"><strong><a>See all groups</a></strong></h5>
          </Link>
        </div>
      </div>
  );
export default SideBar;
