import React from 'react';
import './FileInfo.css';

interface FileInfoProps {
  file: File;
  onRemove: () => void;
}

const FileInfo: React.FC<FileInfoProps> = ({ file, onRemove }) => {
  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
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
        <p className="file-name">{file.name}</p>
        <p className="file-size">{formatFileSize(file.size)}</p>
      </div>
      <button className="remove-btn" onClick={onRemove}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  );
};

export default FileInfo; 