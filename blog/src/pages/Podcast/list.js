
import styles from '../Podcast/components/body/Players.module.css'
import React, {useState, useRef, useEffect} from 'react'
import Dashboard from '../Podcast/components/body/dashboard';
import {songs} from '../Podcast/components/songs'

export default function List() {

      const [currentSongIndex, setCurrentSongIndex] = useState(0);
      const [nextSongIndex, setNextSongIndex] = useState(0);

      useEffect(() => {
        setNextSongIndex(() => {
          if (currentSongIndex + 1 > songs.length - 1) {
            return 0;
          } else {
            return currentSongIndex + 1;
          }
        });
      }, [currentSongIndex]);
    
  return (
    <div className={styles.container}>
      
      <Dashboard
        currentSongIndex={currentSongIndex} 
        setCurrentSongIndex={setCurrentSongIndex} 
        nextSongIndex={nextSongIndex} 
        songs={songs}
      />
    </div>
  )
}
