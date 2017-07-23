import React from 'react';
import { Link } from 'react-router';

const GroupUsers = props => (
    <div className="col-md-12" id="message-board-div">
      <h2>All Group Members</h2>
      <hr/>
      <div className="list-group">
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Jimoh hadi</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Okafor Emmanuel</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Olatunji Iyabo</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Muhammed Zakari</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Albert Einstein</h5>
        </Link>
        <Link className="list-group-item">
          <h5 className="list-group-item-heading">Samuel Okwaraji</h5>
        </Link>
      </div>
      <hr/>
      <ul className="pagination">
        <li><a href="#">&laquo;</a></li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">&raquo;</a></li>
      </ul>
    </div>
);
export default GroupUsers;


