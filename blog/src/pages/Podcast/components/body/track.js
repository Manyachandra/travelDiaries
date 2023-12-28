
import styles from './Tracks.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Track(props) {
    if (props.isPlaying) {
        
    }
  return (
      <>
    <div className={styles.trck}>
          <div className={styles.cplayerdetails}>
            <Link to='/'>
            <h3 className={styles.detailstitle}>{props.song.title}</h3>
            </Link>
            <h4 className={styles.detailsartist}>{props.song.artist}</h4>
        </div>
        <div className={styles.bottom}>       
            <button className={styles.playbtn} onClick={props.click}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
            </button>
        </div>
        </div>
    
    </>
  )
}
