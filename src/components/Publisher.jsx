import React, { Component } from "react";

class Publisher extends Component {
  state = {
    topicInputValue: "",
    topicMessage: "",
    selectedTopic: "",
  };

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
                {this.props.topicList.map((topic) => (
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

  handleTopicCreation = () => {
    this.handlePostRequest(
      "createTopic?topicName=" + this.state.topicInputValue
    );
  };

  handleTopicDeletion = () => {
    this.handlePostRequest(
      "deleteTopic?topicName=" + this.state.topicInputValue
    );
  };

  handlePublishMessage = () => {
    if (this.props.topicList.length > 0) {
      if (this.state.selectedTopic.length === 0) {
        this.state.selectedTopic = this.props.topicList[0];
      }

      this.handlePostRequest(
        "publishMessage?topicName=" +
          this.state.selectedTopic +
          "&messageContent=" +
          this.state.topicMessage
      );

      this.setState({ topicMessage: [] });
    } else {
      alert("There are no active topics at this time");
    }
  };

  handlePostRequest = (endpoint) => {
    fetch(
      this.props.apiURL + endpoint, // Bypass CORS
      {
        method: "POST",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        let message = data.success ? "Success: " : "Failure: ";
        message += data.message;
        alert(message);
        this.props.updateTopicList();
      })
      .catch((error) => {
        alert("An error has occured.");
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
}

export default Publisher;
