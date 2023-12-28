
import styles from '../Podcast/components/Player/Index.module.css'
import {useState, useEffect} from 'react';
import Player from '../Podcast/components/Player/Player';
import {songs} from '../Podcast/components/songs'

export default function Home() {
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
   
      <Player 
        currentSongIndex={currentSongIndex} 
        setCurrentSongIndex={setCurrentSongIndex} 
        nextSongIndex={nextSongIndex} 
        songs={songs}
      
      />
    </div>
  )
}