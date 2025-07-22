import React, { useState } from 'react';
import './App.css';
import PdfUpload from './components/PdfUpload';
import ChatInterface from './components/ChatInterface';

type Screen = 'upload' | 'chat';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('upload');
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);

  const handleFileSelect = (file: File) => {
    setUploadedDocument(file);
    setCurrentScreen('chat');
  };

  const handleBackToUpload = () => {
    setCurrentScreen('upload');
    setUploadedDocument(null);
  };

  return (
    <div className="App">
      {currentScreen === 'upload' ? (
        <>
          <header className="App-header">
            <h1>Knowledge Base UI</h1>
          </header>
          <main>
            <PdfUpload onFileSelect={handleFileSelect} />
          </main>
        </>
      ) : (
        <ChatInterface 
          documentName={uploadedDocument?.name}
          onBackToUpload={handleBackToUpload}
        />
      )}
    </div>
  );
}

export default App;
