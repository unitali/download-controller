// custom.d.ts
declare module '*.json' {
    interface SubFolderImages {
      [key: string]: string[];
    }
  
    interface ImageFolder {
      images: SubFolderImages[];
    }
  
    interface GetImages {
      [key: string]: ImageFolder;
    }
  
    const value: GetImages;
    export default value;
  }
  