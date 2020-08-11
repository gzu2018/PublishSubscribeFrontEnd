import React, { Component } from "react";
import TopicList from "./components/TopicList";
import Publisher from "./components/Publisher";
import Subscriber from "./components/subscriber/Subscriber";
import { TopicContext } from "./state/context/TopicContext";

class App extends Component {
  static contextType = TopicContext;

  state = {
    subscriberCount: 1, // The server is also keeping track of these counts. You need to have one single source for all of your data. Otherwise, you will eventually end up with bugs.
    publisherCount: 2,
    subscriberList: [{ id: 0 }, { id: 1 }], // You're generating and passing these down as props, but the server is also generating a value. Only one of them should control the id. Trying to have both do it will lead to bugs.
    publisherList: [{ id: 0 }, { id: 1 }, { id: 2 }], // Same thing for this
  };

  componentDidMount() {
    this.context.fetchActiveTopics();
  }

  render() {
    return (
      <>
        <h1 className="text-center">Topic List</h1>
        <div className="pt-2 container">
          <TopicList />
        </div>
        <br />  {/* Line breaks are fine for the page, but there's no need to put them in the code as well xD */}
        <div className="row">
          <div className="col-6">
            <button
              className="btn btn-primary btn-block mb-2 container"
              onClick={this.handlePublisherAdd}
            >
              Add Publisher
            </button>
            {this.state.publisherList.map(publisher => (
              <React.Fragment key={publisher.id}>
                <Publisher
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
                  key={subscriber.id}
                  id={subscriber.id}
                  onDelete={this.handleSubscriberDelete}
                />
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
      </>
    );
  }

  // NEVER directly update state. ALWAYS use the setState method
  handleSubscriberAdd = () => this.setState(prevState => ({ subscriberList: [...prevState.subscriberList, { id: prevState.subscriberCount + 1 }], subscriberCount: prevState.subscriberCount + 1 }));

  // NEVER directly update state. ALWAYS use the setState method
  handlePublisherAdd = () => this.setState(prevState => ({ publisherList: [...prevState.publisherList, { id: prevState.publisherCount + 1 }], publisherCount: prevState.publisherCount + 1 }));

  handlePublisherDelete = publisherID => this.setState(prevState => ({ publisherList: prevState.publisherList.filter(c => c.id !== publisherID) }));

  handleSubscriberDelete = subscriberID => this.setState(prevState => ({ subscriberList: prevState.subscriberList.filter(c => c.id !== subscriberID) }));
}

export default App;
