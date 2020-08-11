import React, { useState, useContext } from 'react';
import { getActiveTopics } from '../api/urls';

// Contexts in React allow components to access data without you having to pass said data around as props

export const TopicContext = React.createContext();  // used for class components

export const useTopics = () => useContext(TopicContext);  // used for functional components

const retrieveActiveTopics = (setTopicsLoaded, setTopicList) => () =>
  fetch(getActiveTopics)
    .then(resp => resp.json())
    .then(data => {
      if (data.success === true) {
        setTopicsLoaded(true);
        setTopicList(data.message);
      } else {
        setTopicsLoaded(false);
      }
    })
    .catch(() => setTopicsLoaded(false));

export const TopicContextProvider = ({ children }) => {
  const [topicList, setTopicList] = useState([]);
  const [isTopicsLoaded, setTopicsLoaded] = useState(false);

  return (
    <TopicContext.Provider value={{ topicList, isTopicsLoaded, fetchActiveTopics: retrieveActiveTopics(setTopicsLoaded, setTopicList )}}>
      {children}
    </TopicContext.Provider>
  )
};
