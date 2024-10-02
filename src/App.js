import './App.css';
import InputWithVoiceRecording from './InputWithVoiceRecording';
import { useState, useEffect } from 'react';
import handImg from './images/handImg.jpg';
import intel1Img from './images/intel1Img.jpg';
import intel0Img from './images/intel0Img.jpg';
import logo1 from './images/logo.jpg'

function App() {
  const [responseText, setResponseText] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const bannerImages = [
    intel0Img,
    intel1Img,
    handImg
  ];

  const handleResponseUpdate = (newText) => {
    setResponseText(newText);
    console.log('User entered: ', newText); // Log the new text to the console
  };

  // Automatically change the banner image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  const styles = {
    header: {
      display: 'flex',
      alignItems: 'center', // Align items vertically centered
      gap: '10px', // Space between image and heading
    },
    logo: {
      height: '3em', // Set the height of the image to match the font size of the heading
      width: 'auto', // Maintain aspect ratio
    },
  };
  
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo1} alt="Logo" style={styles.logo} />
        <h1 style={{ margin: 0 }}>PoliSense.AI</h1>
        <p className="tagline">Your Smart Solution for Policy and Claims.</p>
      </header>

      <div className="banner-container">
        <img
          src={bannerImages[currentImageIndex]}
          alt={`Banner ${currentImageIndex}`}
          className="banner-image"
        />
        <div className="dots-container">
          {bannerImages.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* Input Component Section */}
      <InputWithVoiceRecording onResponseUpdate={handleResponseUpdate}/>
    </div>
  );
}

export default App;