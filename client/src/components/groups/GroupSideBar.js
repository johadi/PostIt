import React from 'react';

const GroupSideBar = props => (
    <div className="col-md-push-2 col-md-3 col-sm-12 col-xs-12 well">
      <p>
        <a href="/group" className="btn btn-primary btn-block">Post Message here</a>
        <a href="/messages" className="btn btn-default btn-block">Find User in Group</a>
        <a href="/user" className="btn btn-default btn-block">Leave Group</a>
      </p>
      <hr/>
      <div className="list-group">
        <a href="#" className="list-group-item active">
          <h5 className="list-group-item-heading">Group Members</h5>
        </a>
      </div>
      <div className="list-group">
        <a href="#" className="list-group-item">
          <h5 className="list-group-item-heading">Jimoh Hadi</h5>
        </a>
        <a href="#" className="list-group-item">
          <h5 className="list-group-item-heading">Ekene Famous</h5>
        </a>
        <a href="#" className="list-group-item">
          <h5 className="list-group-item-heading">Muhammed Ali</h5>
        </a>
        <a href="#" className="list-group-item">
          <h5 className="list-group-item-heading">Ozi Alkanemi</h5>
        </a>
        <a href="#" className="list-group-item btn btn-primary">
          <h5 className="list-group-item-heading"><strong><a>See all members</a></strong></h5>
        </a>
      </div>
    </div>
);
export default GroupSideBar;
