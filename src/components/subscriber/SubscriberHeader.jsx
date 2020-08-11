import React from 'react';
import PropTypes from 'prop-types';

const SubscriberHeader = ({ onDelete }) => (
  <div className="modal-header mb-3">
    <h3 className="text-center">Subscriber</h3>
    <button
      type="button"
      className="close"
      aria-label="Close"
      onClick={onDelete}
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

SubscriberHeader.propTypes = {
  onDelete: PropTypes.func.isRequired
};

export default SubscriberHeader;
