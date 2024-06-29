import React, { useState } from "react";
import FolderList from "../FolderList";
import ImageGallery from "../ImageGallery";

const folders = ['01_PACK_ANIMAL', '02_PACK_COMIDAS_DIVERTIDAS', '03_PACK_SMILE', '04_PACK_XICARAS_ANIMADAS'];

const Album: React.FC = () => {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

    const handleFolderClick = (folder: string) => {
        setSelectedFolder(folder);
    };

    return (
        <div className="album">
            {!selectedFolder ? (
                <FolderList folders={folders} onFolderClick={handleFolderClick} />
            ) : (
                <ImageGallery folder={selectedFolder} />
            )}
        </div>
    );
};

export default Album;
