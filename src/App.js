import React, { Component } from "react";
import "./App.css";

import TopicList from "./components/TopicList";
import Publisher from "./components/Publisher";
import Subscriber from "./components/Subscriber";

class App extends Component {
  state = {
    apiURL: "http://localhost:8888/",
    socketURL: "ws://localhost:8080/",
    isTopicsLoaded: false,
    topicList: [],
    subscriberCount: 1,
    publisherCount: 2,
    subscriberList: [{ id: 0 }, { id: 1 }],
    publisherList: [{ id: 0 }, { id: 1 }, { id: 2 }],
  };

  componentDidMount() {
    this.handleRetrieveActiveTopics();
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center">Topic List</h1>
        <div className="pt-2 container">
          <TopicList
            topicList={this.state.topicList}
            topicsLoaded={this.state.isTopicsLoaded}
            onUpdate={this.handleRetrieveActiveTopics}
          />
        </div>

        <br />

        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-primary btn-block mb-2 container"
              onClick={this.handlePublisherAdd}
            >
              Add Publisher
            </button>
            {this.state.publisherList.map((publisher) => (
              <React.Fragment key={publisher.id}>
                <Publisher
                  apiURL={this.state.apiURL}
                  updateTopicList={this.handleRetrieveActiveTopics}
                  key={publisher.id}
                  id={publisher.id}
                  onDelete={this.handlePublisherDelete}
                />
                <br />
              </React.Fragment>
            ))}
          </div>
          
          <div className="col-6">
            <button
              className="btn btn-primary btn-block mb-2 container"
              onClick={this.handleSubscriberAdd}
            >
              Add Subscriber
            </button>
            {this.state.subscriberList.map((subscriber) => (
              <React.Fragment key={subscriber.id}>
                <Subscriber
                  className="col-sm-6"
                  apiURL={this.state.apiURL}
                  socketURL={this.state.socketURL}
                  topicList={this.state.topicList}
                  updateTopicList={this.handleRetrieveActiveTopics}
                  key={subscriber.id}
                  id={subscriber.id}
                  onDelete={this.handleSubscriberDelete}
                />
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleRetrieveActiveTopics = () => {
    fetch(this.state.apiURL + "getAllTopicNames")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success === true) {
          this.setState({
            isTopicsLoaded: true,
            topicList: data.message,
          });
        } else {
          this.setState({
            isTopicsLoaded: false,
          });
        }
      })
      .catch((error) => {
        this.setState({
          isTopicsLoaded: false,
        });
      });
  };

  handleSubscriberAdd = () => {
    this.state.subscriberList.push({ id: this.state.subscriberCount + 1 });
    this.setState({ subscriberCount: this.state.subscriberCount + 1 });
  };

  handlePublisherAdd = () => {
    this.state.publisherList.push({ id: this.state.publisherCount + 1 });
    this.setState({ publisherCount: this.state.publisherCount + 1 });
  };

  handlePublisherDelete = (publisherID) => {
    const remainingPublishers = this.state.publisherList.filter(
      (c) => c.id !== publisherID
    );
    this.setState({ publisherList: remainingPublishers });
  };

  handleSubscriberDelete = (subscriberID) => {
    const remainingSubscribers = this.state.subscriberList.filter(
      (c) => c.id !== subscriberID
    );
    this.setState({ subscriberList: remainingSubscribers });
  };
}

export default App;
