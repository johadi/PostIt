import React from 'react';

/**
 * Signup modal
 * @function SignupModal
 * @param {object} props
 * @return {XML} JSX
 */
const SignupModal = props => (
      <div className="modal fade" id="myModal" tabIndex="-1"
           role="dialog" aria-labelledby="myModalLabel">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close"
                      data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2 className="modal-title" id="myModalLabel">
                <strong>Hi, Welcome to PostIt</strong>
              </h2>
            </div>
            <div className="modal-body">
              <h4 className="text-center text-success">
                We are excited you joined
                <strong>PostIt</strong>.
                A simple notification application for loved ones.
              </h4>
              <p className="text-center">
                <strong>
                Create groups and share every bit of your moment with loved ones.
                </strong>
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger"
                      data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
  );
export default SignupModal;
