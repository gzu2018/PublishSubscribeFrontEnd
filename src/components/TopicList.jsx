import React, { Component } from "react";

class TopicList extends Component {
  render() {
    return (
      <React.Fragment>
        <ul className="list-group">{this.renderAllTopics()}</ul>

        <div className="pt-3" style={{ textAlign: "center" }}>
          <button className="btn btn-success" onClick={this.props.onUpdate}>
            Refresh
          </button>
        </div>
      </React.Fragment>
    );
  }

  renderAllTopics = () => {
    if (!this.props.topicsLoaded) {
      return <p style={{ color: "#FF0000" }}>Topic loading error</p>;
    }

    if (this.props.topicList.length === 0) {
      return <li className="list-group-item">No topics found</li>;
    }

    return (
      <React.Fragment>
        {this.props.topicList.map((topic) => (
          <li className="list-group-item" key={topic}>
            {topic}
          </li>
        ))}
      </React.Fragment>
    );
  };
}

export default TopicList;