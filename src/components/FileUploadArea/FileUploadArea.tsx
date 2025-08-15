import React, { useState, useRef } from 'react';
import './FileUploadArea.css';

interface FileUploadAreaProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
  selectedFile?: File | null;
  onRemoveFile?: () => void;
  accept?: string;
  maxSize?: number; // in bytes
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({
  onFileSelect,
  isUploading = false,
  selectedFile,
  onRemoveFile,
  accept = '.pdf',
  maxSize = 10 * 1024 * 1024 // 10MB default
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.type !== 'application/pdf') {
      return false;
    }
    
    if (file.size > maxSize) {
      return false;
    }
    
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveFile?.();
  };

  return (
    <div
      className={`file-upload-area ${isDragOver ? 'drag-over' : ''} ${selectedFile ? 'has-file' : ''} ${isUploading ? 'uploading' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        disabled={isUploading}
      />
      
      {selectedFile && (
        <div className="file-info">
          <div className="file-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <div className="file-details">
            <p className="file-name">{selectedFile.name}</p>
            <p className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button className="remove-btn" onClick={handleRemoveClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUploadArea; 