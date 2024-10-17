import React, { useState } from 'react';
import './section_1.css'; // External CSS for styling


const ServiceSection = () => {
  // State to manage the image
  const [mainImage, setMainImage] = useState(
    '../../Images/busbar(2).jpg'
  );

  // Define images corresponding to each heading
  const images = {
    finAI: '../../Images/busbar(2).jpg', // Change this to the actual path of your image
    omnichannel: './WhatsApp-Image-2024-06-27-at-12.28.40-300x225 (1).webp', // Change this to the actual path of your image
    helpCenter: './WhatsApp-Image-2024-06-27-at-12.28.40-300x225 (1).webp', // Change this to the actual path of your image
  };

  return (
    <section className="service-section">
      <div className="service-container">
        {/* Left Section */}
        <div className="service-left">
          {/* <div className="badge">For customers</div> */}
          <h1>Al Responder</h1>
          <hr />

          <div className="details">
            <div className="item" onClick={() => setMainImage(images.finAI)}>
              <strong>Ask About</strong>
              <p>
                Get all the information regarding the services or
                products of this business
              </p>
              <strong>Help Center</strong>
              <p>
              Get any help you may need regarding the business
              and services surroundinc
              </p>
              <strong>Review Assistant</strong>
              <p>
              Answer any review In the social media with our business
            intormation.
              </p>

            </div>
            <hr />
            <div className="item" onClick={() => setMainImage(images.omnichannel)}>
              <strong>Omnichannel</strong>
              <p>Deliver exceptional experiences wherever your customers are.</p>
            </div>
            <div className="item" onClick={() => setMainImage(images.helpCenter)}>
              <strong>Help Center</strong>
              <p>
                Help customers find accurate answers when and where they need
                them.
              </p>
            </div>
          </div>

          <button className="learn-more-btn">Learn more</button>
        </div>

        {/* Right Section */}
        <div className="service-right">
          <img id="main-image" src={mainImage} alt="Chat Interface" />
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;