import React from "react";
import { useTopics } from '../state/context/TopicContext';

// Functional components are preferred over class components because they minify better (for production), and they help in forcing you to keep things small and for a specific purpose
//  They're also easier to test because they often force you to split things into smaller functions and components

const TopicList = () => {
  const { topicList, isTopicsLoaded, fetchActiveTopics} = useTopics();
  return (
    <>
      {!isTopicsLoaded && <p style={{ color: "#FF0000" }}>Topic loading error</p>}
      {isTopicsLoaded && (
        <ul className="list-group">
          {topicList.length === 0 ? (
            <li className="list-group-item">No topics found</li>
          ) : topicList.map(topic => (
              <li className="list-group-item" key={topic}>
                {topic}
              </li>
            )
          )}
        </ul>
      )}
      <div className="pt-3" style={{ textAlign: "center" }}>
        <button className="btn btn-success" onClick={fetchActiveTopics}>
          Refresh
        </button>
      </div>
    </>
);
};

export default TopicList;