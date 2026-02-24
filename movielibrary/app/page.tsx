"use client";

import Image from 'next/image';  //Next.js optimized Image component - Supports lazy loading.
import styles from './Home.module.css';  //Scope these styles locally to the component that imports them - The file must contain .module. in its name for Next.js to treat it as a CSS Module.

import { useState,useEffect } from "react";

import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const [inputValue, setInputValue] = useState("");

  const handleAction = () => {
    router.push(`/movies?movie=${encodeURIComponent(inputValue)}`);
  };

  const myLibLoad = () => {     
    router.push(`mylibrary`);
  }

  return (
    <main className={styles.mainContainer}>  
      <div className={styles.backgroundWrapper}>  
        <Image
          src="/Images/MovieWallPaper2.jpg"  //This image must be inside your public/Images folder.
          alt="Background Image"
          fill                            // Make this image fill its parent container.
          style={{ objectFit: 'cover' }} // The image fills the container-Maintains aspect ratio-Crops overflow if necessary
          priority                       //Load this image immediately
        />
      </div>      

      <div className={styles.overlay} />

      <div className={styles.myLib}>
        <button onClick={myLibLoad}>My Library</button>
      </div>

      <div className={styles.srchBar}>
        <input type='text' value = {inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder='Search here...'></input>
        <button onClick={handleAction} >
          <img src = "/Images/SearchButton.png" 
            alt = "SearchImg"/>          
        </button>

      </div>
    </main>
  );
}




//<svg path = "movielibrary\public\Images\SearchButton.svg"/>


        
