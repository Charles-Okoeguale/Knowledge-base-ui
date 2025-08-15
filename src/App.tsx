import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import PdfUpload from './components/PdfUpload';
import ChatInterface from './components/ChatInterface';
import { api, UploadResponse } from './services/api';

type Screen = 'upload' | 'chat';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('upload');
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [documentInfo, setDocumentInfo] = useState<UploadResponse | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setUploadError('');

    try {
      const metadata = {
        author: 'User',
        category: 'document',
        description: 'Uploaded via knowledge base UI'
      };

      const response = await api.uploadDocument(file, metadata);
      
      setDocumentInfo(response);
      setUploadedDocument(file);
      setCurrentScreen('chat');
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleBackToUpload = () => {
    setCurrentScreen('upload');
    setUploadedDocument(null);
    setDocumentInfo(null);
    setUploadError('');
  };

  return (
    <div className="App">
      {currentScreen === 'upload' ? (
        <>
          <Header />
          <main>
            <PdfUpload 
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
              error={uploadError}
            />
          </main>
        </>
      ) : (
        <ChatInterface 
          documentName={uploadedDocument?.name}
          documentInfo={documentInfo}
          onBackToUpload={handleBackToUpload}
        />
      )}
    </div>
  );
}

export default App;
