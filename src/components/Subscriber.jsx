import React, { Component } from "react";

class Subscriber extends Component {
  state = {
    serverSocket: null,
    selectedTopic: "",
    subscriberID: -1,
    messageArea: [],
    subscribedArea: [],
  };

  componentDidMount() {
    this.connectToSocketServer();
    this.date = new Date();
  }

  componentWillUnmount() {
    this.state.serverSocket.close();
  }

  render() {
    return (
      <div className="card container pt-3 pb-3">
        <div className="modal-header mb-3">
          <h3 className="text-center">Subscriber</h3>
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
          <div className="input-group">
            <select
              name="selectedTopic"
              value={this.state.selectedTopic}
              onChange={this.handleChange}
              onClick={this.props.updateTopicList}
              className="custom-select col-10 mr-1"
            >
              <option value hidden>
                Choose your topic
              </option>
              {this.props.topicList.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
            <button
              className="btn btn-success mr-1"
              onClick={this.handleSubscribe}
            >
              Subscribe
            </button>
            <button
              className="btn btn-danger mr-1"
              onClick={this.handleUnsubscribe}
            >
              Unsubscribe
            </button>
          </div>

          <br />

          <div className="form-row">
            <div className="form-group col-10">
              <label>Messages</label>
              <textarea
                className="form-control"
                readOnly={true}
                rows="10"
                value={this.state.messageArea.join("\n")}
                id="messageArea"
              ></textarea>
            </div>
            <div className="form-group col-2">
              <label>Subscribed</label>
              <textarea
                className="form-control"
                readOnly={true}
                rows="10"
                id="subscribedArea"
                value={this.state.subscribedArea.join("\n")}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    );
  }

  connectToSocketServer = () => {
    var socket = new WebSocket(this.props.socketURL);

    socket.onopen = () => {
      console.log("Client socket connected");
    };

    socket.onmessage = (event) => {
      if (this.state.subscriberID === -1) {
        this.setState({ subscriberID: event.data }); // could be string
        console.log("Client socket connected with ID: " + event.data);
      } else {
        this.state.messageArea.push(
          this.date.toLocaleTimeString() + " " + event.data
        );
        this.forceUpdate();
        var messageAreaElement = document.getElementById("messageArea");
        messageAreaElement.scrollTop = messageAreaElement.scrollHeight;
      }
    };

    socket.onclose = () => {
      console.log("Client socket disconnected.");
    };

    this.setState({
      serverSocket: socket,
    });
  };

  handleSubscribe = () => {
    if (this.state.selectedTopic.length > 0) {
      this.handlePostRequest(
        "subscribeToTopic?id=" +
          this.state.subscriberID +
          "&topicName=" +
          this.state.selectedTopic
      );
    } else {
      alert("Please select a topic");
    }
  };

  handleUnsubscribe = () => {
    if (this.state.selectedTopic.length > 0) {
      this.handlePostRequest(
        "unsubscribeToTopic?id=" +
          this.state.subscriberID +
          "&topicName=" +
          this.state.selectedTopic
      );
    } else {
      alert("Please select a topic");
    }
  };

  refreshActiveTopics = () => {
    fetch(
      this.props.apiURL +
        "getSubscriberActiveTopics?id=" +
        this.state.subscriberID
    )
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success === true) {
          this.setState({
            subscribedArea: data.message,
          });
        } else {
          alert("Error refreshing topics");
        }
      })
      .catch((error) => {
        alert("Error refreshing topics");
      });
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
        this.refreshActiveTopics();
      })
      .catch((error) => {
        alert("An error has occured.");
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
}

export default Subscriber;
