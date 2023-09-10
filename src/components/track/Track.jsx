import { useState, useEffect, useRef, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import './Track.css';

import SelectedSongContext from '../../context/SelectedSongContext';
import SearchSongContext from '../../context/SearchSongContext';

function Track({song, trackIndx, trackId}) {
    //trackInd -- index of this track in the playlist thst user seeing...
    const [ duration, setDuration ] = useState(`00:00`);
    const audioTrack = useRef(null);
    const { searchLine } = useContext(SearchSongContext);
    const { selectedSong, setSelectedSong, setSelectedAudioTrack, trackManager, setTrackManager, setCurrentPlayList, setCurrentTrack} = useContext(SelectedSongContext);

    useEffect(()=>{
        let tempTrackManager = trackManager;
        if(!tempTrackManager[trackId]) tempTrackManager[trackId] = {};
        tempTrackManager[trackId][trackIndx] = setSelectedSongAndAudio;

        if(trackId == 'top-tracks')
            console.log()

        setTrackManager(tempTrackManager);
    }, [song, audioTrack]);
    
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

    function setSelectedSongAndAudio() {
        setSelectedSong(song);
        setSelectedAudioTrack(audioTrack.current);

        //for next and prev
        setCurrentPlayList(trackId);
        setCurrentTrack(trackIndx);
    }

    return (
        <div data-key={trackIndx} className={`track ${(searchLine != '' && !(song.name.toLowerCase().includes(searchLine.toLowerCase()) || song.artist.toLowerCase().includes(searchLine.toLowerCase())))? 
            'hidden-track' : 
            null}`
            }
            style={selectedSong?.id == song.id? { backgroundColor: 'rgba(255, 255, 255, 0.25)' } : null}
            onClick={()=>{
                setSelectedSongAndAudio();
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
                <Skeleton circle width={45} height={45}/>
                <div className='track-names'>
                    <Skeleton width={160} height={20}/>
                    <Skeleton width={90} height={10}/>
                </div>
            </div>
            <Skeleton width={50} height={15}/>
        </div>
    );
}

export { TrackSkeleton };
export default Track;