import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTopics } from '../../state/context/TopicContext';
import { getActiveSubscriberTopics, subscribeToTopic, unsubscribeFromTopic } from '../../state/api/urls';

const refreshActiveSubscriberTopics = (setSubscribedArea, subscriberID) =>
  fetch(getActiveSubscriberTopics + subscriberID)
    .then(resp => resp.json())
    .then(data => (data.success === true) ? setSubscribedArea(data.message) : alert("Error refreshing topics"))
    .catch(() => alert("Error refreshing topics"));

const handlePostRequest = endpoint =>
  fetch(endpoint, { method: "POST" })
    .then(resp => resp.json())
    .then(data => {
      alert(`${data.success ? "Success:" : "Failure:"} ${data.message}`);
    })
    .catch(() => alert("An error has occured."));

const handleSubscribe = (subscriberID, topic) => 
  topic.length > 0
    ? handlePostRequest(subscribeToTopic(subscriberID, topic))
    : alert("Please select a topic");

const handleUnsubscribe = (subscriberID, topic) =>
  topic.length > 0
    ? handlePostRequest(unsubscribeFromTopic(subscriberID, topic))
    : alert("Please select a topic");

const SubscriberTopics = ({ subscriberID, setSubscribedArea }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const { topicList } = useTopics();

  return (
    <div className="input-group">
      <select
        name="selectedTopic"
        value={selectedTopic}
        onChange={event => setSelectedTopic(event.target.value)}
        className="custom-select col-10 mr-1"
      >
        <option value hidden>Choose your topic</option>
        {topicList.map(topic => <option key={topic}>{topic}</option>)}
      </select>
      <button className="btn btn-success mr-1" onClick={() => handleSubscribe(subscriberID, selectedTopic).then(() => refreshActiveSubscriberTopics(setSubscribedArea, subscriberID))}>
        Subscribe
      </button>
      <button className="btn btn-danger mr-1" onClick={() => handleUnsubscribe(subscriberID, selectedTopic).then(() => refreshActiveSubscriberTopics(setSubscribedArea, subscriberID))}>
        Unsubscribe
      </button>
    </div>
  );
};

SubscriberTopics.propTypes = {
  subscriberID: PropTypes.number.isRequired,
  setSubscribedArea: PropTypes.func.isRequired
};

export default SubscriberTopics;