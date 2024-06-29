import React, { useEffect, useState } from 'react';
import getImages from '../../assets/getImages.json';

interface SubFolderImages {
  [key: string]: string[];
}

interface ImageFolder {
  subFolders: boolean;
  images: (SubFolderImages | string[])[];
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

  useEffect(() => {
    const imagesData = getImages as GetImages;
    if (imagesData && imagesData[folder]) {
      if (imagesData[folder].subFolders) {
        // Caso haja subpastas, inicialmente não definimos nenhuma imagem
        setImages([]);
        setSelectedSubFolder(null); // Resetamos a subpasta selecionada
      } else {
        // Caso não haja subpastas, carregamos as imagens diretamente
        const folderImages = imagesData[folder].images.map(imageName =>
          `src/assets/${folder}/${imageName}`
        );
        setImages(folderImages);
      }
    }
  }, [folder]);

  const handleSubFolderClick = (subFolder: SubFolderImages) => {
    const subFolderName = Object.keys(subFolder)[0];
    const imagesPaths = subFolder[subFolderName].map(imageName =>
      `src/assets/${folder}/${subFolderName}/${imageName}`
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
        {getImages[folder].subFolders && (
          <div className="col-12 mb-3">
            {getImages[folder].images.map((subFolder, index) => {
              const subFolderObj = subFolder as SubFolderImages;
              const subFolderName = Object.keys(subFolderObj)[0];
              return (
                <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" className="btn-check" name="btnradio" id={`btn-sub-folder-${index}`} autoComplete="off" defaultChecked key={index} onClick={() => handleSubFolderClick(subFolderObj)} />
                  <label className="btn btn-outline-primary" htmlFor={`btn-sub-folder-${index}`}>{subFolderName}</label>
                </div>
              );
            })}
          </div>
        )}
        {images.map((image, index) => (
          <div key={index} className="col-md-3 mb-3" style={{ maxWidth: "150px" }}>
            <div className="card d-flex justify-content-center align-items-center">
              <img className="card-img-top" src={image} alt={`Image ${index + 1}`} />
              <div className="card-body">
                <button className="btn btn-primary" onClick={() => handleDownload(image)}>Download</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
