import React from 'react';

const CreateGroup = props => (
    <div className="col-sm-offset-2 col-sm-8 well well-lg" id="create-group-div">
      <form className="form-horizontal" role="form">
        <p className="text-center"><strong>Create Your Group and start adding members</strong></p>
        <div className="form-group">
          <div className="col-lg-12">
            <input type="text" className="form-control input-lg" id="inputEmail1" placeholder="Enter Group name"/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-md-12">
            <button type="submit" className="btn btn-block btn-primary btn-lg">Create Group</button>
          </div>
        </div>
      </form>
    </div>
);
export default CreateGroup;

