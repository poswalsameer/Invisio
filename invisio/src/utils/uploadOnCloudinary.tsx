"use client";
import { CldImage } from 'next-cloudinary';


export default function Page(props:any) {
  return (

    // THIS IS THE COMPONENT THROUGH WHICH IMAGE IS UPLOADED ON CLOUDINARY

    // THE IMAGE WILL BE PASSED AS A PROP
    <CldImage
      src={props.localFile} 
      crop={{
        type: 'auto',
        source: true
      }}
      alt=""
    />
  );
}