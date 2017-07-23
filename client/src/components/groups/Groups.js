import React from 'react';
import { Link } from 'react-router';

const Groups = props => (
    <div className="col-md-12" id="message-board-div">
      <h2>All Your Groups</h2>
      <hr/>
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
        <Link to="/group-messages" className="list-group-item">
          <h5 className="list-group-item-heading">Lagos Flexers</h5>
        </Link>
        <Link to="/group-messages" className="list-group-item">
          <h5 className="list-group-item-heading">Andela Chilling Club</h5>
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
export default Groups;

