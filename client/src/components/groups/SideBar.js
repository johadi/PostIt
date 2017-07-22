import React from 'react';

const SideBar = props => (
      <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
        <p>
          <a href="/group" className="btn btn-primary btn-lg btn-block">Join Group</a>
          <a href="/messages" className="btn btn-default btn-lg btn-block">Messages</a>
          <a href="/user" className="btn btn-default btn-lg btn-block">Find User</a>
        </p>
        <hr/>
        <div className="list-group">
          <a href="#" className="list-group-item active">
            <h5 className="list-group-item-heading">Trending</h5>
          </a>
        </div>
        <div className="list-group">
          <a href="#" className="list-group-item">
            <h5 className="list-group-item-heading">Jimoh Hadi</h5>
            <p className="list-group-item-text">
              I love coding. It brings the man in you
            </p>
          </a>
        </div>
        <div className="list-group">
          <a href="#" className="list-group-item">
            <h5 className="list-group-item-heading">Jimoh Hadi</h5>
            <p className="list-group-item-text">
              In a world changing so rapidly, the only guanrantee to fail is not taking any risk.
              Mark Zuckerberg
            </p>
          </a>
        </div>
      </div>
  );
export default SideBar;
