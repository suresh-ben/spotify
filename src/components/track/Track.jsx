import { useState, useEffect, useRef, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import './Track.css';

import SelectedSongContext from '../../context/SelectedSongContext';
import SearchSongContext from '../../context/SearchSongContext';

function Track({song}) {
    const [ duration, setDuration ] = useState(`00:00`);
    const audioTrack = useRef(null);
    const { searchLine } = useContext(SearchSongContext);
    const { selectedSong, setSelectedSong, setSelectedAudioTrack } = useContext(SelectedSongContext);

    useEffect(()=>{
        calculateTime();
    }, [audioTrack, audioTrack?.current, audioTrack?.current?.loadedmetadata, audioTrack?.current?.readyState, audioTrack?.current?.duration]);

    function calculateTime() {
        try {
            const secs = audioTrack.current.duration;
            // console.log(secs)
            if(!secs || isNaN(secs)) setTimeout(()=> calculateTime(), 100);

            const minutes = Math.floor(secs / 60);
            const seconds = Math.floor(secs % 60);

            const formattedMinutes = minutes < 10? `0${minutes}` : `${minutes}`;
            const formattedSeconds = seconds < 10? `0${seconds}` : `${seconds}`;

            const formattedTime = `${formattedMinutes}:${formattedSeconds}`;
            if(formattedTime != `NaN:NaN`)
                setDuration(formattedTime); 

        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className={`track ${(searchLine != '' && !(song.name.toLowerCase().includes(searchLine.toLowerCase()) || song.artist.toLowerCase().includes(searchLine.toLowerCase())))? 
            'hidden-track' : 
            null}`
            }
            style={selectedSong?.id == song.id? { backgroundColor: 'rgba(255, 255, 255, 0.25)' } : null}
            onClick={()=>{
                setSelectedSong(song);
                setSelectedAudioTrack(audioTrack.current);
            }}
        >
            <div className='image-names'>
                <img src={`https://cms.samespace.com/assets/${song.cover}`} alt="Image" loading='lazy'/>
                <div className='track-names'>
                    <p className='track-name'>{song.name}</p>
                    <p className='track-artist'>{song.artist}</p>
                </div>
            </div>
            <p className='track-time'>{duration}</p>
            <audio data-track={song.id} ref={audioTrack} src={song.id !== 5 && song.id !== 6 && song.id !== 9? song.url : `https://pub-172b4845a7e24a16956308706aaf24c2.r2.dev/august-145937.mp3`}></audio>
            {/* audio links id= 5, 6, 9 are broken... */}
        </div>
    );
}

function TrackSkeleton () {
    return(
        <div className='track'>
            <div className='image-names'>
                <Skeleton circle width={50} height={50}/>
                <div className='track-names'>
                    <Skeleton width={200} height={25}/>
                    <Skeleton width={100} height={15}/>
                </div>
            </div>
            <Skeleton width={50} height={15}/>
        </div>
    );
}

export { TrackSkeleton };
export default Track;