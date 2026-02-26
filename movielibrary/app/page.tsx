"use client";

import Image from 'next/image';  
import styles from './Home.module.css'; 

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
          src="/Images/MovieWallPaper2.jpg"  
          alt="Background Image"
          fill                            
          style={{ objectFit: 'cover' }} 
          priority                       
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


        
