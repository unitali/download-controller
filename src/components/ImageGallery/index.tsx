import React, { useEffect, useState } from 'react';
import getImages from "../../assets/getImages.json";

interface SubFolderImages {
  [key: string]: string[] | undefined;
}

interface ImageFolder {
  subFolder: boolean;
  images: SubFolderImages[];
}

interface GetImages {
  [key: string]: ImageFolder;
}

interface ImageGalleryProps {
  folder: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ folder }) => {
  const [images, setImages] = useState<string[]>([]);
  const [selectedSubFolder, setSelectedSubFolder] = useState<string | null>(null);
  const [folderData, setFolderData] = useState<ImageFolder | null>(null);

  useEffect(() => {
    const imagesData: GetImages = getImages as GetImages;
    if (imagesData && imagesData[folder]) {
      const folderData = imagesData[folder];
      setFolderData(folderData);
      if (folderData.subFolder) {
        const firstSubFolder = folderData.images[0];
        handleSubFolderClick(firstSubFolder);
      } else {
        handleNoSubFolders(folderData);
      }
    }
  }, [folder]);

  const handleNoSubFolders = (folderData: ImageFolder) => {
    const imagesPaths: string[] = [];
    const subFolder = folderData.images[0];
    const subFolderName = Object.keys(subFolder)[0];
    const subFolderImages = subFolder[subFolderName] || [];
    subFolderImages.forEach((imageName) => {
      imagesPaths.push(`/assets/${folder}/${imageName}`);
    });
    setImages(imagesPaths);
    setSelectedSubFolder(null);
  };

  const handleSubFolderClick = (subFolder: SubFolderImages) => {
    const subFolderName = Object.keys(subFolder)[0];
    const imagesPaths = (subFolder[subFolderName] || []).map(
      (imageName) => `/assets/${folder}/${subFolderName}/${imageName}`
    );
    setImages(imagesPaths);
    setSelectedSubFolder(subFolderName);
  };

  const handleDownload = async (image: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '');
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 mb-3">
          {folderData?.images.map((subFolder: SubFolderImages, index: number) => {
            const subFolderName = Object.keys(subFolder)[0];
            return (
              <div key={index}
                className="btn-group"
                role="group"
                aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id={`btn-sub-folder-${index}`}
                  autoComplete="off"
                  checked={subFolderName === selectedSubFolder}
                  onChange={() => handleSubFolderClick(subFolder)}
                />
                <label className="btn btn-outline-primary"
                  htmlFor={`btn-sub-folder-${index}`}>
                  {subFolderName}
                </label>
              </div>
            );
          })}
        </div>
        {images.length > 0 ? (
          images.map((image, index) => (
            <div key={index}
              className="col-md-3 mb-3"
              style={{ maxWidth: '150px' }}>
              <div className="card d-flex justify-content-center align-items-center">
                <img className="card-img-top"
                  src={image}
                  alt={`Image ${index + 1}`} />
                <div className="card-body">
                  <button className="btn btn-primary"
                    onClick={() => handleDownload(image)}>
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No images found in the selected folder.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
