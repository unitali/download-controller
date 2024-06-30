import React, { useEffect, useState } from 'react';
import FolderList from '../components/FolderList';
import ImageGallery from '../components/ImageGallery';
import foldersData from "../../public/assets/getImages.json";

const Home: React.FC = () => {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
    const [folders, setFolders] = useState<string[]>([]);

    const handleFolderClick = (folder: string) => {
        setSelectedFolder(folder);
    };

    useEffect(() => {
        const keys = Object.keys(foldersData);
        setFolders(keys);
    }, []);

    return (
        <div>
            <FolderList folders={folders} onFolderClick={handleFolderClick} />
            {selectedFolder && (
                <ImageGallery folder={selectedFolder} />
            )}
        </div>
    );
};

export default Home;
