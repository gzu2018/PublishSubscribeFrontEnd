import React from 'react';
import PropTypes from 'prop-types';

// It's probably a bit overkill to create this small component, but it can be helpful for testing to make sure that your text areas have the correct info
const SubscriberTextArea = ({ id, className, label, text }) => (
  <div className={className}>
    <label>{label}</label>
    <textarea id={id} className="form-control" readOnly rows="10" value={text} />
  </div>
);

SubscriberTextArea.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SubscriberTextArea;
