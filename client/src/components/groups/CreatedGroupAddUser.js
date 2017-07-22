import React from 'react';

const CreateGroupAddUser = props => (
    <form className="form-horizontal" role="form">
      <div className="row well well-sm">
        <div className="col-lg-10 col-lg-offset-1">
          <div className="input-group">
            <input placeholder="Search Users in your list" type="text" className="form-control"/>
            <span className="input-group-btn">
              <button className="btn btn-default" type="button">Search User</button>
            </span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <table className="table table-striped">
            <caption><h3>List of users you can add</h3></caption>
            <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Add</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>Jimoh</td>
              <td>John Samuel</td>
              <td><a className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
            </tr>
            <tr>
              <td>Johadi</td>
              <td>Mary Yan</td>
              <td><a className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
            </tr>
            <tr>
              <td>Johadi</td>
              <td>Sanni Ali</td>
              <td><a className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
            </tr>
            <tr>
              <td>Johadi</td>
              <td>Muhammed Ali</td>
              <td><a className="btn btn-primary btn-sm btn-block" href="">Add</a></td>
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

