import React from 'react';

const AddUserToGroup = props => (
    <div className="col-sm-offset-1 col-sm-10 well well-lg" id="add-user-div">
      <form className="form-horizontal" role="form">
        <p className="text-success text-center"><strong>{"Add User to Group (ensure you enter a valid user's information)"}</strong></p>
        <div className="form-group">
          <div className="col-lg-12">
            <input type="text" className="form-control" id="username" placeholder="Enter username or email or mobile number of a user"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-12">
            <input type="text" className="form-control" id="username" placeholder="Search your group list"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-12">
            <select className="form-control" id="groups">
              <option>-Select Group-</option>
              <option>Andela</option>
              <option>Bootcamp 24</option>
              <option>Sport</option>
              <option>Entertainment</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <button type="submit" className="btn btn-block btn-primary">Add User to Group</button>
          </div>
        </div>
      </form>
    </div>
);
export default AddUserToGroup;

