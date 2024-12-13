import React, { useState, useEffect } from "react";
import "./chatbot.css";
import axios from 'axios'

import PImage from '../../Images/pen_12332869.png';
import iconImage from '../../Images/chatbot_6231457.png';
import SentImage from '../../Images/paper-plane_3917620.png';
import BoxIMage1 from '../../Images/box-image1.jpg'
import BoxIMage2 from '../../Images/box-image2.png'


function AmazingBoxes({ai_response_data}) {

  const [boxesData, setBoxesData] = useState([])

  useEffect(() => {
    setBoxesData(ai_response_data);
  })

  return (
    <div className="amazing-boxes">

      {/* {boxesData.length} */}

      <div className="bigger-box">
        <img src={BoxIMage2} height={'360px'} width={'300px'} alt="" />
        <p className="title-box">
          AVA - AI Responder
        </p>
      </div>

      <div className="boxes-set">
        <div className="single-box">
          <img height={'160px'} width={'300px'}src={BoxIMage1} alt="" />
          <p className="title-box">
            AVA - AI Menu Mixer
          </p>
        </div>

        <div className="single-box">
          <img height={'160px'} width={'300px'} src={BoxIMage1} alt="" />
          <p className="title-box">
            AVA - AI Sharing
          </p>
        </div>
      </div>
    </div>
  )
}



const ChatBot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(true);

  const [inputValue, setInputValue] = useState("");
  const [showResponse, setShowResponse] = useState(false); 
  const [displayedResponse, setDisplayedResponse] = useState(""); 

  const handleSuggestionClick = (text) => {
    setInputValue(text); 
  };

  
  const handleSendClick = () => {
    if (inputValue.trim() !== "") { 

      axios.get(`http://localhost:8000/agent/chat/?id=1&user_input=${inputValue}`)
      .then((res) => {
        console.log(res.data.response.msg);

        setShowResponse(true); 
        setDisplayedResponse(''); 
        simulateTyping(res.data.response.msg);
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
      console.log("Current index:", index); 
      console.log("Current char:", msg[index]);
      
      if (index < msg.length) {
        setDisplayedResponse((prev = "") => {
          
          return (prev || "") + (msg[index] || ""); 
        });
        index++; 
      } else {
        clearInterval(typingInterval);
      }
    }, 30);  
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
              <div className="chat-header-buttons">
                <button onClick={toggleChat} className="chat-sign-up-btn">Close</button>
                <button className="chat-sign-up-btn">Sign Up</button>
              </div>
            </div>
          </div>

          <div className="container">
          {!showResponse ? (
            <div className={"ai-box-response"} >
              <AmazingBoxes />
            </div>
          ) : (
            <div className={"ai-response-container"} >
              <p className="text-based-ai-response">{displayedResponse}</p>
            </div>
          )}

          {/* <div className={`${isFullScreen ? "suggestions-box" : "hide"}`}>
            <h2>Prompt Suggestions for You</h2>
            <div className="suggestion-items">
              <SuggestionItem text="Lorem, ipsum dolor sit amet consectetur." onClick={handleSuggestionClick} />
              <SuggestionItem text="Lorem, ipsum dolor sit amet" onClick={handleSuggestionClick} />
              <SuggestionItem text="Lorem ipsum dolor." onClick={handleSuggestionClick} />
              <SuggestionItem text="Lorem, ipsum dolor sit amet consectetur." onClick={handleSuggestionClick} />
            </div>
          </div> */}

          <div className="input-holder-chat">
            <div className="input-box" >
                <input
                  className="input"
                  placeholder="Type your message..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="input-image" onClick={handleSendClick}>
                  <img src={SentImage} className="send-icon" alt="Send Icon" />
                </div>
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
