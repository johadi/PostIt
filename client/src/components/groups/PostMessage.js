import React from 'react';

const PostMessage = props => (
    <div className="col-sm-offset-1 col-sm-10 well well-lg" id="post-message-div">
      <form className="form-horizontal" role="form">
        <p className="text-center"><strong>Post to Andela group</strong></p>
        <div className="form-group">
          <div className="col-lg-12">
            <textarea rows="5" className="form-control" id="message" placeholder="Type your Post"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <button type="submit" className="btn btn-block btn-post btn-lg">Send Post</button>
          </div>
        </div>
      </form>
    </div>
);
export default PostMessage;
