import React, { useState } from 'react';
import Navbar from '../Header/header.jsx';
import Hero from '..//Hero/hero.jsx';
import ChatBot from '../chatbot/chatbot.jsx'
import ServiceSection_2 from '../Sections/section_1.jsx'

import './home.css'; 

function Home() {
    return (
      <div className="Home">
        <div className="bg-video-container-section">
          <video className="hero-video" autoPlay loop muted>
            <source src="/bg-video-ai.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* COMPONENTS */}

          <Navbar />
          <Hero />
          <ChatBot />
          <ServiceSection_2 />


        </div>
      </div>
  
    );
  }

export default Home;