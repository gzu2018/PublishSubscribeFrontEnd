import React, { useState, useEffect } from "react";
import SubscriberHeader from './SubscriberHeader';
import SubscriberTopics from './SubscriberTopics';
import SubscriberTextArea from './SubscriberTextArea';

const Subscriber = ({ onDelete }) => {
  const [subscriberID, setSubscriberID] = useState(-1);
  const [messageArea, setMessageArea] = useState([]);
  const [subscribedArea, setSubscribedArea] = useState([]);

  // You can read more in detail about useEffect on the react website, but a simplistic explanation is that acts similar to combining componentDidMount, componentDidUpdate, and componentWillUnmount
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080/");

    socket.onopen = () => console.log("Client socket connected");

    socket.onmessage = event => {
      if (!isNaN(event.data)) {   // the first message will be the ID, but thereafter will be a message. isNaN will return true if the string is not a number, which the message won't be as the name is always a part of the message
        setSubscriberID(parseInt(event.data, 10));
        console.log("Client socket connected with ID: " + event.data);
      } else {
        setMessageArea(prev => [...prev, `${(new Date()).toLocaleTimeString()} ${event.data}`]);
        const messageAreaElement = document.getElementById("messageArea");
        messageAreaElement.scrollTop = messageAreaElement.scrollHeight;
      }
    };

    socket.onclose = () => console.log("Client socket disconnected.");

    return () => socket.onclose();
  }, []);

  // Making the smaller components is extremely helpful for simplifying things and making you components easier to read. It also allows the smaller components to handle data that only they need, instead of making the parent manage everything
  return (
    <div className="card container pt-3 pb-3">
      <SubscriberHeader onDelete={() => onDelete(subscriberID)} />
      <div className="container">
        <SubscriberTopics subscriberID={subscriberID} setSubscribedArea={setSubscribedArea} />
        <br />
        <div className="form-row">
          <SubscriberTextArea id="messageArea" className="form-group col-10" label="Messages" text={messageArea.join("\n")} />
          <SubscriberTextArea id="subscribedArea" className="form-group col-2" label="Subscribed" text={subscribedArea.join("\n")} />
        </div>
      </div>
    </div>
  );
};

export default Subscriber;
