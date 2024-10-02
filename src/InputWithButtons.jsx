import React, { useState, useRef } from 'react';

const InputWithButtons = () => {
  const [inputText, setInputText] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent default newline behavior on Enter
      console.log(inputText); // Logs the text from the input box
      setInputText(''); // Clears the input box after logging
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInputText(file.name); // Set the input box text to the file name
      console.log("File selected: ", file.name);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={styles.container}>
      <textarea
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Type something or select a file..."
        style={styles.textarea}
        rows="3" // Set the default rows for multiline
      />
      <button style={styles.button} title="Record voice">
        🎤 {/* Microphone Icon */}
      </button>
      <button style={styles.button} onClick={openFileDialog} title="Attach a file">
        ➕ {/* Plus/Attachment Icon */}
      </button>
      {/* Hidden file input element with restricted file types */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept=".doc,.docx,.pdf" // Restrict file types to .doc, .docx, and .pdf
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start', // Align top for better textarea alignment
    gap: '10px',
  },
  textarea: {
    flex: 1,
    width: '400px', // Increased width for more typing space
    padding: '10px',
    fontSize: '16px',
    resize: 'both', // Allows the user to resize the textarea
  },
  button: {
    padding: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    border: '1px solid lightgray',
    borderRadius: '4px',
    background: 'white',
  },
};

export default InputWithButtons;