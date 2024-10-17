import React, { useState, useEffect } from 'react';
import './hero.css'; // Assuming new CSS file for the Hero section

const Hero = () => {
  const [currentContent, setCurrentContent] = useState(0);
  const [animateOut, setAnimateOut] = useState(false);

  const contentData = [
    {
      heading: 'IAIA',
      text: 'Explore our advanced virtual agents with our Integrated Artificial Intelligence Adhoc (IAIA) system... Our innovative framework is ideal for environments that demand highly adaptable and customized AI solutions...'
    },
    {
      heading: 'AIOT',
      text: `Experience the tuture or smart technology with our
      Artificial Intelligence of Things (AloT) service
      where we specialize in adapting advanced virtual
      assistants into vour loT devices. Tailored to meet
      your specitic needs, our Al-enhanced solutions
      transtorm everyday obiects into intelligent systems
      providing seamless interaction and enhanced
      functionality across a wide range of applications`
    },
    {
      heading: 'Efficiency',
      text: 'Efficiently meet specific requirements with our highly tailored AI solutions and flexible systems... Our innovative framework is ideal for environments that demand highly adaptable and customized AI solutions... Our innovative framework is ideal for environments that demand highly adaptable and customized AI solutions...'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateOut(true);  // Trigger wipe-out animation
      setTimeout(() => {
        setCurrentContent((prev) => (prev + 1) % contentData.length);
        setAnimateOut(false);  // Reset wipe-out animation after content change
      }, 1000);  // Match the animation duration
    }, 5000);  // Switch content every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className={`hero-content ${animateOut ? 'wipe-out' : ''}`}>
        <h1>{contentData[currentContent].heading}</h1>
        <p>{contentData[currentContent].text}</p>
        {/* Uncomment if you want to include a button */}
        {/* <div className="hero-buttons">
          <button className="hero-btn">Contact Sales</button>
        </div> */}
      </div>
      <video className="hero-video" autoPlay muted loop>
        <source src="path-to-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  );
};

export default Hero;
