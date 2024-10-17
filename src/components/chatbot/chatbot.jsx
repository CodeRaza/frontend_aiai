import React, { useState, useEffect } from "react";
import "./chatbot.css";
import axios from 'axios'


import PImage from '../../Images/pen_12332869.png';
import iconImage from '../../Images/chatbot_6231457.png';
import SentImage from '../../Images/paper-plane_3917620.png';


const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [showResponse, setShowResponse] = useState(false); 
  const [displayedResponse, setDisplayedResponse] = useState(""); 

  const handleSuggestionClick = (text) => {
    setInputValue(text); 
  };

  
  const handleSendClick = () => {
    if (inputValue.trim() !== "") { 

      axios.get(`http://16.171.169.228:8000/agent/chat/?id=1&user_input=${inputValue}`)
      .then((res) => {
        console.log(res.data.response.msg);

        setShowResponse(true); 
        setDisplayedResponse(''); 
        simulateTyping(res.data.response.msg); // Start typing animation
      })
      .catch(err => {
        console.log(err);
      })
      
    } else {
      alert("Please enter a message before sending."); 
    }
  };


  const simulateTyping = (msg = "") => {
    if (!msg) {
      console.error("Message is undefined or empty!");
      return;
    }
  
    // Reset the response before starting
    setDisplayedResponse("");  
    let index = 0;
  
    // Typing simulation
    const typingInterval = setInterval(() => {
      console.log("Current index:", index); // Debugging the index
      console.log("Current char:", msg[index]); // Debugging the current character being appended
  
      // Ensure msg[index] is valid and within bounds
      if (index < msg.length) {
        setDisplayedResponse((prev = "") => {
          // Make sure we're appending valid characters, and avoid 'undefined' in the previous state
          return (prev || "") + (msg[index] || ""); 
        });
        index++; // Increment the index after appending the current character
      } else {
        clearInterval(typingInterval); // Stop the interval when done
      }
    }, 30);  // Adjust the interval time to fit the desired typing speed
  };
  
  
  


  useEffect(() => {


    
    if (chatOpen && messages.length === 0) {
      const initialMessage = {
        text: "Hi, I am Mixeat, I would love to help your today's food selection.",
        sender: "website",
      };
      setMessages([initialMessage]);
    }
  }, [chatOpen]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="App">
      <div className="chat-btn" onClick={toggleChat}>
        <img
          src="https://img.icons8.com/ios-filled/50/ffffff/chat--v1.png"
          alt="Chat"
        />
      </div>

      {chatOpen && (
        <div className={`chat-window ${isFullScreen ? "fullscreen" : ""}`}>
          <div className="chat-header">
            <div className="header-icons">
              <img
                className="expand-icon"
                onClick={toggleFullScreen}
                src="https://img.icons8.com/ios-glyphs/30/ffffff/full-screen.png"
                alt="Expand"
                style={{ cursor: "pointer" }}
              />
              <img
                className="close-icon"
                onClick={toggleChat}
                src="https://img.icons8.com/ios-filled/30/ffffff/delete-sign.png"
                alt="Close"
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </div>
          </div>


          <div className="container">
          {!showResponse ? (
            <div className="icon-box">
              <img className="icon" src={iconImage} alt="Chatbot Icon" />
              <h2>IAIA</h2>
              <p>
                YOUR ADVANCE VA.
              </p>
            </div>
          ) : (
            <div className={`${isFullScreen ? "dummy-response" : "dummy-response-mobile"}`} >
              <p>{displayedResponse}</p>
            </div>
          )}


          <div className={`${isFullScreen ? "suggestions-box" : "hide"}`}>
            <h2>Prompt Suggestions for You</h2>
            <div className="suggestion-items">
              <SuggestionItem text="Lorem, ipsum dolor sit amet consectetur." onClick={handleSuggestionClick} />
              <SuggestionItem text="Lorem, ipsum dolor sit amet" onClick={handleSuggestionClick} />
              <SuggestionItem text="Lorem ipsum dolor." onClick={handleSuggestionClick} />
              <SuggestionItem text="Lorem, ipsum dolor sit amet consectetur." onClick={handleSuggestionClick} />
            </div>
          </div>

          <div className="input-box" >
              <input
                className="input"
                placeholder="Type your message..."
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className={isFullScreen ? "send-btn-opened" : 'send-btn'} > {isFullScreen ? "Back to Results" : "Back"}</button>
              <div className="input-image" onClick={handleSendClick}>
                <img src={SentImage} className="send-icon" alt="Send Icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SuggestionItem = ({ text, onClick }) => (
  <div className="suggestion-item" onClick={() => onClick(text)}>
    <img src={PImage} alt="Suggestion Icon" className="icon-item" />
    <span>{text}</span>
  </div>
);



export default ChatBot;
