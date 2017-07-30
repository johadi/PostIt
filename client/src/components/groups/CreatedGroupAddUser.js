import React from 'react';

const CreateGroupAddUser = props => (
    <form className="form-horizontal" role="form">
      <h3 className="text-center">Add Users to <span className="text-capitalize">{props.name} Group</span></h3>
      <div className="row well well-sm">
        <div className="col-lg-10 col-lg-offset-1">
          <div className="input-group">
            <input placeholder="Search Users you want to add" type="text" className="form-control"/>
            <span className="input-group-btn">
              <button className="btn btn-post" type="button">Search</button>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <table className="table table-striped">
            <caption>
              <h3>Search result appears here</h3>
              {(props.addUserError && <h4 className="text-center text-danger">{props.addUserError}</h4>) ||
              (props.addUserSuccess && <h4 className="text-center text-success">User addedd successfully</h4>)}
            </caption>
            <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Add</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Johadi</td>
              <td>Jimoh hadi</td>
              <td><a onClick={props.onAddUser} id={'johadi'} className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
            </tr>
            <tr>
              <td>Jimoh</td>
              <td>Jimoh Ovenje</td>
              <td><a onClick={props.onAddUser} id={'jimoh'} className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
            </tr>
            <tr>
              <td>Sherif</td>
              <td>Muhammed Sherif</td>
              <td><a onClick={props.onAddUser} id={'sherif'} className="btn btn-primary btn-sm btn-block" href="">Already Member</a></td>
            </tr>
            <tr>
              <td>Johadi</td>
              <td>Muhammed Ali</td>
              <td><a onClick={props.onAddUser} id={'kamil'} className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
            </tr>
            <tr>
              <td colSpan="3">
                <ul className="pagination">
                  <li><a href="#">&laquo;</a></li>
                  <li><a href="#">1</a></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#">&raquo;</a></li>
                </ul>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
);
export default CreateGroupAddUser;

