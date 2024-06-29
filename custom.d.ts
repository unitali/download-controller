// custom.d.ts
declare module '*.json' {
    const value: {
      [key: string]: {
        images: {
          [key: string]: string[];
        }[];
      };
    };
    export default value;
  }
  