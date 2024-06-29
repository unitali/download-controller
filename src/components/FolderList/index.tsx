import React from 'react';

interface FolderListProps {
  folders: string[];
  onFolderClick: (folder: string) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, onFolderClick }) => {
  return (
    <div id='folder-list' className="folder-list">
      {folders.map((folder, index) => (
        <div key={folder} className="btn-group" role="group">
          <input
            id={`folder-${index}`}
            type="radio"
            className="btn-check"
            name="folder-radio"
            autoComplete="off"
            onClick={() => onFolderClick(folder)}
          />
          <label htmlFor={`folder-${index}`} className="btn btn-outline-primary">
            {folder}
          </label>
        </div>
      ))}
    </div>
  );
};

export default FolderList;
