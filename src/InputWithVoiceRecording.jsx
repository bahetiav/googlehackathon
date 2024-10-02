import React, { useState, useRef, useEffect  } from 'react';
import './InputWithVoiceRecording.css'; // Import the CSS file

const InputWithVoiceRecording = ({ onResponseUpdate }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]); // Store chat messages
  const fileInputRef = useRef(null);
  const inputRef = useRef(null); // Create a ref for the input element

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    // Focus the input element when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const toggleVoiceRecognition = () => {
    if (!recognition) {
      alert("Speech Recognition is not supported in your browser.");
      return;
    }

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  if (recognition) {
    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInputText((prevText) => prevText + ' ' + voiceText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  }

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message to chat
    setMessages((prevMessages) => [...prevMessages, { text: inputText, sender: 'user' }]);
    onResponseUpdate(inputText); // Optionally pass to parent
    setInputText(''); // Clear the input box

    // Simulate a system response
    setTimeout(() => {
      const systemResponse = `Response to: ${inputText}`; // Simulated response
      setMessages((prevMessages) => [...prevMessages, { text: systemResponse, sender: 'system' }]);
    }, 1000); // Simulated delay
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputText(`Selected file: ${file.name}`);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="container">
      <div className="chatContainer">
        <div className="messagesContainer">
          {messages.map((message, index) => (
            <div key={index} className={message.sender === 'user' ? 'userMessage' : 'systemMessage'}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="inputContainer"> {/* New div to hold input and buttons */}
        <textarea
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type something, record voice, or select a file..."
          className="textarea"
          rows="3"
        />
        <button
          className="button"
          style={{ backgroundColor: isRecording ? 'red' : 'white' }}
          onClick={toggleVoiceRecognition}
          title="Record voice"
        >
          🎤
        </button>
        <button className="button" onClick={openFileDialog} title="Attach a file">
          ➕
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
          accept=".doc,.docx,.pdf"
        />
      </div>
    </div>
  );
};

export default InputWithVoiceRecording;