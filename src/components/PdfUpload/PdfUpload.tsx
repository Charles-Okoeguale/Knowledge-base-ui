import React, { useState } from 'react';
import './PdfUpload.css';
import FileUploadArea from '../FileUploadArea';
import LoadingSpinner from '../LoadingSpinner';
import '../../styles/shared.css';

interface PdfUploadProps {
  onFileSelect?: (file: File) => void;
  isUploading?: boolean;
  error?: string;
}

const PdfUpload: React.FC<PdfUploadProps> = ({ onFileSelect, isUploading = false, error = '' }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [localError, setLocalError] = useState<string>('');

  const validateFile = (file: File): boolean => {
    if (file.type !== 'application/pdf') {
      setLocalError('Please select a valid PDF file');
      return false;
    }
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setLocalError('File size must be less than 10MB');
      return false;
    }
    
    setLocalError('');
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setLocalError('');
  };

  const displayError = error || localError;

  return (
    <div className="pdf-upload-container">
      <div className="upload-header">
        <h2>Upload PDF Document</h2>
        <p>Drag and drop your PDF file here or click to browse</p>
      </div>

      <FileUploadArea
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
        selectedFile={selectedFile}
        onRemoveFile={removeFile}
      />

      {isUploading && (
        <div className="upload-content">
          <LoadingSpinner 
            text="Processing document..." 
            hint="This may take a few moments"
          />
        </div>
      )}

      {!selectedFile && !isUploading && (
        <div className="upload-content">
          <div className="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7,10 12,15 17,10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <p className="upload-text">Click to select or drag PDF here</p>
          <p className="upload-hint">Maximum file size: 10MB</p>
        </div>
      )}

      {displayError && (
        <div className="error-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          {displayError}
        </div>
      )}

      {selectedFile && !displayError && !isUploading && (
        <div className="success-message">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          File selected successfully!
        </div>
      )}
    </div>
  );
};

export default PdfUpload; 