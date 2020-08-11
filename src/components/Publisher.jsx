import React, { Component } from "react";
import { apiURL } from '../state/api/urls';
import { TopicContext } from '../state/context/TopicContext';

class Publisher extends Component {
  static contextType = TopicContext;

  state = {
    publisherID: -1,
    topicInputValue: "",
    topicMessage: "",
    selectedTopic: "",
    activeTopics: [],
  };

  componentDidMount() {
    this.getSubscriberID();
  }

  componentWillUnmount() {
    this.destroyAllOwnedTopics();
    setTimeout(() => this.context.fetchActiveTopics(), 500);
  }

  render() {
    return (
      <div className="card container pt-3 pb-3">
        <div className="modal-header mb-3">
          <h3 className="text-center">Publisher</h3>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={() => this.props.onDelete(this.props.id)}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="container">
          <div className="form-inline">
            <label className="pr-1">Topic Name </label>
            <input
              type="text"
              className="form-control mr-1"
              name="topicInputValue"
              value={this.state.topicInputValue}
              onChange={this.handleChange}
            />
            <button
              className="btn btn-success mr-1"
              onClick={this.handleTopicCreation}
            >
              Create
            </button>
            <button
              className="btn btn-danger mr-1"
              onClick={this.handleTopicDeletion}
            >
              Delete
            </button>
          </div>

          <br />

          <div className="form-group">
            <label>Message Content</label>
            <textarea
              className="form-control"
              name="topicMessage"
              value={this.state.topicMessage}
              onChange={this.handleChange}
              rows="3"
            ></textarea>
            <form className="form-inline row mt-1">
              <label className="col-auto">Topic</label>
              <select
                name="selectedTopic"
                value={this.state.selectedTopic}
                onChange={this.handleChange}
                className="custom-select col-10"
              >
                {this.state.activeTopics.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
              <button
                className="btn btn-success ml-1 col-1"
                style={{ float: "right" }}
                onClick={this.handlePublishMessage}
                type="button"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleTopicCreation = () => this.handlePostRequest(`createTopic?id=${this.state.publisherID}&topicName=${this.state.topicInputValue}`);

  handleTopicDeletion = () => this.handlePostRequest(`deleteTopic?id=${this.state.publisherID}&topicName=${this.state.topicInputValue}`);

  handlePublishMessage = () => {
    if (this.state.activeTopics.length > 0) {
      let topicToPublish = this.state.activeTopics[0];

      if (this.state.selectedTopic.length > 0) {
        topicToPublish = this.state.selectedTopic;
      }

      this.handlePostRequest(`publishMessage?id=${this.state.publisherID}&topicName=${topicToPublish}&messageContent=${this.state.topicMessage}`);

      this.setState({ topicMessage: [] });
    } else {
      alert("There are no active topics at this time");
    }
  };

  refreshActiveTopics = () => 
    fetch(apiURL + "getPublisherActiveTopics?id=" + this.state.publisherID)
      .then(resp => resp.json())
      .then(data => data.success === true ? this.setState({ activeTopics: data.message }) : alert("Error refreshing active topic list"))
      .catch(() => alert("Error refreshing active topic list"));

  handlePostRequest = endpoint =>
    fetch(apiURL + endpoint, { method: "POST" })
      .then(resp => resp.json())
      .then(data => {
        alert(`${data.success ? "Success:" : "Failure:"} ${data.message}`);
        this.context.fetchActiveTopics();
        this.refreshActiveTopics();
      })
      .catch(() => alert("An error has occured."));

  getSubscriberID = () =>
    fetch(apiURL + "initializePublisher")
      .then(resp => resp.json())
      .then(data => data.success === true ? this.setState({ publisherID: data.message }) : alert("Could not initialize subscriber ID from server"))
      .catch(() => alert("Could not initialize subscriber ID from server"));

  destroyAllOwnedTopics = () => fetch(`${apiURL}removeAllSubscriberActiveTopics?id=${this.state.publisherID}`, { method: "POST", });

  handleChange = event => this.setState({ [event.target.name]: event.target.value });
}

export default Publisher;
