import React, { useState } from 'react';
import { FileAnalisysResponse, Word } from '../types';

function FileUploader({ setWords }: { setWords: (words: Word[]) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const [uploadMessage, setUploadMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0]; 
      console.log(selectedFile);

    if (!selectedFile) {
      setError('No file selected');
      setFile(null);
      return;
    }

    if (selectedFile.type !== 'text/plain') {
      setError('Only .txt files are allowed');
      setFile(null);
      return;
    }
    
    setError('');
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file before uploading');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json() as FileAnalisysResponse;
      setWords(result.words);
      setUploadMessage(`File uploaded successfully:\n ${result.message}`);
    } catch (error) {
      setUploadMessage('Failed to upload file');
    }
  };

  return (
    <div className="upload-box">
      <h3>Upload a .txt file to analyze it</h3>
      <div className="file-upload-container">
      <label htmlFor="file-upload" className="file-upload-label">
        Choose File
        <input
          id="file-upload"
            type="file"
            accept=".txt"
          className="file-upload-input"
          onChange={handleFileChange}
        />
      </label>
      <span className="file-upload-filename">
        {file?.name || "No file selected"}
      </span>
    </div>
      {error && <p className="error-message">{error}</p>}
      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={!file}
        style={{
          backgroundColor: file ? '#007BFF' : '#CCCCCC',
          cursor: file ? 'pointer' : 'not-allowed',
        }}
      >
        Upload
      </button>
      {uploadMessage && <p className="success-message">{uploadMessage}</p>}
    </div>
  );
}

export default FileUploader;
