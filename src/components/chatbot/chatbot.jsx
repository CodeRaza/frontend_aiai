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
  const url = 'http://3.147.70.68:8000'
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
  const [loading, setLoading] = useState(false); // For loading animation
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    booking_time: "",
    dishes_selected: "",
  });
  const [foodItems, setFoodItems] = useState([]);

  const handleCustomerDataChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCustomerData = () => {
    // Send the collected customer data to the backend to save in the database
    axios.post(`${url}/api/customers/`, customerData)
      .then((res) => {
        console.log('Customer data saved successfully:', res.data);
        
      })
      .catch((err) => {
        console.error('Error saving customer data:', err);
      });
  };

  const handleSuggestionClick = (text) => {
    setInputValue(text); 
  };

  
  const handleSendClick = () => {
    if (inputValue.trim() !== "") { 
      setLoading(true);
      axios.get(`${url}/api/ai/?agent_id=1&user_input=${inputValue}`)
      .then((res) => {
        console.log(res.data.response);
        // setFoodItems(res.data.menu_items);
        setShowResponse(true); 
        setDisplayedResponse(''); 
        simulateTyping(res.data.response);
      })
      .catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
      
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
    setDisplayedResponse(msg);  
    // let index = -1;
  
    // // Typing simulation
    // const typingInterval = setInterval(() => {
    //   console.log("Current index:", index); 
    //   console.log("Current char:", msg[index]);
      
    //   if (index < msg.length) {
    //     setDisplayedResponse((prev = "") => {
          
    //       return (prev || "") + (msg[index] || ""); 
    //     });
    //     index++; 
    //   } else {
    //     clearInterval(typingInterval);
    //   }
    // }, 30);  
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

  const handleKeyPress = (e) => {
    console.log(e.key);
    
    if (e.key === "Enter") {
      handleSendClick();
    }
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
                {loading ? <div className="loading-spinner"></div> : <AmazingBoxes />}
              </div>
          ) : (
            <div className={"ai-response-container"} >
              <p className="text-based-ai-response" dangerouslySetInnerHTML={{__html: displayedResponse}}></p>
              {/* {foodItems.length > 0 && foodItems.map((item, index) => (
                    <div key={index} className="food-item">
                      <img src={item.image_url} alt={item.name} className="food-image" />
                      <p>{item.name}</p>
                    </div>
                ))} */}
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
                  onKeyDown={handleKeyPress}
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
