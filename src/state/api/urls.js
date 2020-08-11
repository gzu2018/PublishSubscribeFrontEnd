export const apiURL = "http://localhost:8888/";  // This is a constant, and you never change it, so there's no reason to hold it in state. It's better to have it out as a static constant like this.

export const getActiveSubscriberTopics = `${apiURL}getSubscriberActiveTopics?id=`;

export const subscribeToTopic = (subscriberID, topic) => `${apiURL}subscribeToTopic?id=${subscriberID}&topicName=${topic}`;

export const unsubscribeFromTopic = (subscriberID, topic) => `${apiURL}unsubscribeToTopic?id=${subscriberID}&topicName=${topic}`;

export const getActiveTopics = `${apiURL}getAllTopicNames`;