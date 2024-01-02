import React, { useState, useEffect } from 'react';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [droppedFiles, setDroppedFiles] = useState([]);

  useEffect(() => {
    // Function to handle the drop event
    const handleDrop = (event) => {
      event.preventDefault();

      const files = event.dataTransfer.files;

      // Allow only one file from drop
      if (files.length === 1) {
        setSelectedFile(files[0]);
        setDroppedFiles([files[0]]);
      }
    };

    // Adding event listeners for drop and dragover events on the document
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', (event) => event.preventDefault());

    // Cleanup: Remove event listeners when the component unmounts
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', (event) => event.preventDefault());
    };
  }, []); // No dependencies to run the effect only once

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Allow only one file from file input
    setSelectedFile(file);
    setDroppedFiles([file]);
  };

//   const handlePaste = (event) => {
//     event.preventDefault();
  
//     const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  
//     // Check if there are items in the clipboard
//     if (items.length > 0) {
//       const fileItem = Array.from(items).find((item) => item.kind === 'file');
  
//       // Check if a file item is found
//       if (fileItem) {
//         const pastedFile = fileItem.getAsFile();
  
//         // Allow only one file from paste
//         setSelectedFile(pastedFile);
//         setDroppedFiles([pastedFile]);
//       } else {
//         // If no file item is found, assume it's a plain text and set it as the file name
//         const pastedText = event.clipboardData.getData('text');
//         const fileName = pastedText.trim(); // Remove leading/trailing spaces
//         const file = new File([/* content */], fileName, { type: 'text/plain' });
  
//         // Allow only one file from paste
//         setSelectedFile(file);
//         setDroppedFiles([file]);
//       }
//     }
//   };
  
const handlePaste = (event) => {
    event.preventDefault();
  
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
  
    // Check if there are items in the clipboard
    if (items.length > 0) {
      const fileItem = Array.from(items).find((item) => item.kind === 'file');
  
      // Check if a file item is found
      if (fileItem) {
        const pastedFile = fileItem.getAsFile();
  
        // Allow only one file from paste
        setSelectedFile(pastedFile);
        setDroppedFiles([pastedFile]);
      } else {
        // If no file item is found, do nothing or show an error message
        console.log('No file found in clipboard');
      }
    }
  };
  
  

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setDroppedFiles([]);
  };

  return (
    <div>
      <label htmlFor="fileInput">Choose File:</label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        onPaste={handlePaste}
        onDragOver={(event) => event.preventDefault()}
        onDragEnter={(event) => event.preventDefault()}
      />

      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          <button onClick={handleRemoveFile}>Remove File</button>
        </div>
      )}

      {/* <div>
        <h2>Dropped Files</h2>
        <ul>
          {droppedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default FileUpload;
