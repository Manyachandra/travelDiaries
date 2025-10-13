import React, {useState, useRef, useEffect} from 'react'
import styles from './Index.module.css';
import Details from './Details';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

function Player(props) {
  const { search } = useLocation();
  const raw = (search || '').slice(1);
  const tr = raw.split("~");
  const audioUrl = tr[0] || '';
  const posterUrl = tr[1] || '';
  const title = tr[2] || '';
     //new
    // state
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [nextSongIndex, setNextSongIndex] = useState(0);
  
    useEffect(() => {
      setNextSongIndex(() => {
        if (currentSongIndex + 1 > 6) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      });
    }, [currentSongIndex]);
    
    const chapters = [
        {
          start: 0,
          end: 15
        },
        {
          start: 60,
          end: 75
        }
      ]

    // references
    const audioPlayer = useRef();   // reference our audio component
    const progressBar = useRef();   // reference our progress bar
    const animationRef = useRef();  // reference the animation
  

      useEffect(() => {
        if (currentTime == duration) {
          togglePlayPause();
          SkipSong();
          timeTravel(0);
        }
      }, [currentTime]);



    useEffect(() => {
      const onLoaded = () => {
        const seconds = Math.floor(audioPlayer.current.duration || 0);
        setDuration(Number.isFinite(seconds) ? seconds : 0);
        progressBar.current.max = Number.isFinite(seconds) ? seconds : 0;
      };
      const el = audioPlayer.current;
      if (el) {
        el.addEventListener('loadedmetadata', onLoaded);
      }
      return () => {
        if (el) el.removeEventListener('loadedmetadata', onLoaded);
      };
    }, []);
  
    const calculateTime = (secs) => {
      const minutes = Math.floor(secs / 60);
      const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(secs % 60);
      const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${returnedMinutes}:${returnedSeconds}`;
    }

    const play = async () => {
      try {
        await audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying)
      } catch (_) {
        // Autoplay block or not supported
        setIsPlaying(false);
      }
    }

    const togglePlayPause = async () => {
        const prevValue = isPlaying;
        setIsPlaying(!prevValue);
        if (!prevValue) {
          try {
            await audioPlayer.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
          } catch (_) {
            setIsPlaying(false);
          }
        } else {
          audioPlayer.current.pause();
          cancelAnimationFrame(animationRef.current);
        }
      }
  
    const whilePlaying = () => {
      progressBar.current.value = audioPlayer.current.currentTime;
      changePlayerCurrentTime();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  
    const changeRange = () => {
      audioPlayer.current.currentTime = progressBar.current.value;
      changePlayerCurrentTime();
    }
  
    const changePlayerCurrentTime = () => {
      progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
      setCurrentTime(progressBar.current.value);
    }


  const timeTravel = (newTime) => {
    progressBar.current.value = newTime;
    changeRange();
  }

    //forward backward
    const SkipSong = (forwards = true) => {
    if (forwards) {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp++;

            if (temp > 6) {
                temp = 0;
            }

            return temp;
        });
    } else {
        setCurrentSongIndex(() => {
            let temp = currentSongIndex;
            temp--;

            if (temp < 0) {
                temp = 6 - 1;
            }

            return temp;
        });
    }
}

  return (
        <div className={styles.container}>
        <div className={styles.cplayer}>
            <h4>Playing now</h4>
            <Details img={posterUrl} title={title} />
           
            <audio ref={audioPlayer} src={audioUrl} preload="metadata"></audio>
        {/* current time */}
        <div className={styles.barss}>
         <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

        {   /* progress bar */}
        <div className={styles.progressBarWrapper}>
        <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
        {chapters.map((chapter, i) => {
          const leftStyle = chapter.start / duration * 100;
          const widthStyle = (chapter.end - chapter.start) / duration * 100;
          return (
            <div
              key={i}
              className={`${styles.chapter} ${chapter.start == 0 && styles.start} ${chapter.end == duration && styles.end}`}
              style={{
                '--left': `${leftStyle}%`,
                '--width': `${widthStyle}%`,
              }}
            ></div>
          )
        })}
      </div>

        {/* duration */}
        <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
        </div>
        <div className={styles.cplayercontrols}>
            <button className={styles.skipbtn} onClick={() => SkipSong(false)}>
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button className={styles.playbtn} onClickCapture={togglePlayPause}>
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay } />
            </button>
            <button className={styles.skipbtn} onClick={() => SkipSong()}>
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
            {/* <p>Next up: <span>{props.songs[nextSongIndex].title} by {props.songs[nextSongIndex].artist}</span></p> */}
        </div>
        </div>
    )
}

export default Player;