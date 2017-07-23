import React from 'react';
import { Link } from 'react-router';

const GroupMessageBoard = props => (
    <div className="col-md-12" id="message-board-div">
      <h2>Andela Group</h2>
      <hr/>
      <div className="media">
        <div className="media-left">
        </div>
        <div className="media-body">
          <h4 className="media-heading">Jimoh Hadi
            <small> posted at 4:56 PM</small>
          </h4>
          <p><Link to="/message">In a world changing faster than you imagine, the only guarantee to failure is not
            taking
            any risk...
          </Link></p>
        </div>
      </div>
      <hr/>
      <div className="media">
        <div className="media-left">
        </div>
        <div className="media-body">
          <h4 className="media-heading">Nnamdi Azikwe
            <small> posted at 3:04 AM</small>
          </h4>
          <p><a>In a world changing faster than you imagine, the only guarantee to failure is not
            taking
            any risk...
          </a></p>
        </div>
      </div>
      <hr/>
      <div className="media">
        <div className="media-left">
        </div>
        <div className="media-body">
          <h4 className="media-heading">Obafemi Awolowo
            <small> posted at 5:00 PM</small>
          </h4>
          <p><a>In a world changing faster than you imagine, the only guarantee to failure is not
            taking
            any risk...
          </a></p>
        </div>
      </div>
      <hr/>
      <div className="media">
        <div className="media-left">
        </div>
        <div className="media-body">
          <h4 className="media-heading">Sir Ahmadu Bello
            <small> posted at 4:23 PM</small>
          </h4>
          <p><a>In a world changing faster than you imagine, the only guarantee to failure is
            not taking
            any risk...
          </a></p>
        </div>
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
export default GroupMessageBoard;

