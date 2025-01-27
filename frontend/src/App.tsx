import React from 'react';
import './App.css';
import FileUploader from './components/fileUploader';
import FileAnalisysResults from './components/fileAnalisysResults';
import { Word } from './types';

function App() {
  const [words, setWords] = React.useState<Word[]>([]);
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>File Upload Server</h2>
          <FileUploader setWords={setWords} />
          <FileAnalisysResults words={words} />
          <br/>
          <a href="/files">View Uploaded Files</a>
        </div>
      </header>
      
    </div>
  );
}

export default App;
