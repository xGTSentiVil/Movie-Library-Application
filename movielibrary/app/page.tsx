"use client";

import Image from 'next/image';  //Next.js optimized Image component - Supports lazy loading.
import styles from './Home.module.css';  //Scope these styles locally to the component that imports them - The file must contain .module. in its name for Next.js to treat it as a CSS Module.

export default function Home() {
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
        <button onClick={() => console.log("Clicked")}>My Library</button>
      </div>

      <div className={styles.srchBar}>
        <input type='text' placeholder='Search here...'></input>
        <button>
          <img src = "/Images/SearchButton.png" 
            alt = "SearchImg"/>          
        </button>

      </div>
    </main>
  );
}


//<svg path = "movielibrary\public\Images\SearchButton.svg"/>


        
