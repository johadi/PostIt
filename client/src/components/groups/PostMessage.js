import React from 'react';

const PostMessage = props => (
    <div className="col-sm-offset-1 col-sm-10 well well-lg" id="post-message-div">
      <form className="form-horizontal" role="form">
        <p className="text-center"><strong>Post on topical issues relating to group you chose</strong></p>
        <div className="form-group">
          <div className="col-lg-12">
            <textarea rows="4" className="form-control" id="inputEmail1" placeholder="Type your Post"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-12">
            <input placeholder="Search group" type="text" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-lg-12">
            <select className="form-control" id="groups">
              <option>-Select Group to post to-</option>
              <option>Andela</option>
              <option>Bootcamp 24</option>
              <option>Sport</option>
              <option>Entertainment</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <button type="submit" className="btn btn-block btn-primary btn-lg">Send Post</button>
          </div>
        </div>
      </form>
    </div>
);
export default PostMessage;
