import React from "react";
import { Word } from "../types";

type FileAnalisysResultsProps = {
  words: Word[];
};

const FileAnalisysResults: React.FC<FileAnalisysResultsProps> = ({ words }) => {


  return (
    <div>
      <h3>File Analisys Results</h3>
      <div>
      <table className="table-results">
        <thead>
          <tr>
            <th className="header-row">Word</th>
            <th className="header-row">Count</th>
          </tr>
        </thead>
        <tbody>
          {words.map(([word, count], index) => (
            <tr key={index}>
              <td className="table-row">{word}</td>
              <td className="table-row count-total">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        
    </div>
  );
};

export default FileAnalisysResults;