import { useContext, useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

import { no_track, dots, speaker, pause, play, forward } from '../../contents/images'
import SelectedSongContext from '../../context/SelectedSongContext';

function AudioPlayer() {

    const { selectedSong, selectedAudio, currentPlaylist, trackManager, currentTrack } = useContext(SelectedSongContext);
    const [ percenatgCompleted, setpercentageCompleted] = useState(0);
    const [ prevAudio, setPrevAudio ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ sound, setSound] = useState(100);
    const progressBar = useRef();

    useEffect(()=>{
        
    }, [selectedSong]);

    useEffect(()=>{
        if(selectedAudio?.getAttribute('data-track') === prevAudio?.getAttribute('data-track')) return;
        try {
            if(isPlaying) {
                if(prevAudio) {
                    prevAudio.pause();
                } 
            }
            if(selectedAudio) {
                selectedAudio.currentTime = 0;
                selectedAudio.volume = sound/100;
                selectedAudio.play();
    
                if(prevAudio) 
                    prevAudio.pause();
            }
            setPrevAudio(selectedAudio);
            setIsPlaying(true);
        }
        catch {
            console.log('Error when changing the song');
        }
    }, [selectedAudio])

    function togglePlayPause() {
        if(!selectedAudio) {
            console.log('No song selected');
            return;
        }
        if(isPlaying) {
            selectedAudio.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            selectedAudio.play();
            setIsPlaying(!isPlaying);
        }
    }


    useEffect(() =>
        updateKnob()
    , [progressBar?.current, isPlaying, selectedAudio]); 

    function updateKnob() {
        if(progressBar?.current && isPlaying && selectedAudio) {
            progressBar.current.value = selectedAudio?.currentTime;
            requestAnimationFrame(updateKnob);

            setpercentageCompleted(selectedAudio?.currentTime / selectedAudio?.duration + 0.006);

            if(selectedAudio?.duration <= selectedAudio?.currentTime) {
                setIsPlaying(false);
            }
        }
    }

    function updateAudioTime(delta) {
        if(selectedAudio) {
            selectedAudio.currentTime += delta;
        }
    }

    useEffect(()=>{
        if(selectedAudio)
            selectedAudio.volume = (sound/100);
    }, [sound]);

    return (
        <div className='audio-player'>
            <div className='back-ground' style={{ backgroundColor: selectedSong?.accent, transition: 'background-color 0.5s ease' }}></div> 

            <div className='audio-holder'>
                <div className='audio-names'>
                    <h1 style={{fontWeight: 500}}>{selectedSong? selectedSong.name: 'No Song Selected'}</h1>
                    <p style={{opacity: 0.5, fontSize: '.9rem'}}>{selectedSong? selectedSong.artist: 'Please Select a track to play'}</p>
                </div>

                <div className='audio-image-container' style={selectedSong? {} : {backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: '.5rem'}}>
                    {selectedSong? 
                       <img className='audio-image' src={`https://cms.samespace.com/assets/${selectedSong.cover}`} alt="Song Image" />: 
                        <img className='audio-image' src={no_track} alt="Song Image" />
                    }
                </div>
                
                <div className='input-container'>
                    <input 
                        ref={progressBar}
                        className='audio-bar' 
                        type="range" 
                        defaultValue={0} 
                        max={selectedAudio? Math.floor(selectedAudio.duration): 0}
                        onChange={(event)=>{
                            selectedAudio.currentTime = event.target.value;
                        }}
                    />
                    <div style={{'--completed-percentage': percenatgCompleted}} className='input-completed'></div>
                </div>

                <div className='audio-controls'>
                    <button style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
                        <img src={dots} alt="options" />
                    </button>
                    <div className='main-controls'>
                        <button
                            className='track-change'
                            onClick={()=>{
                                if(currentTrack === null) return; 

                                let prev = trackManager[currentPlaylist][currentTrack - 1];
                                if(!prev) prev = trackManager[currentPlaylist][Object.keys(trackManager[currentPlaylist]).length - 1];
                                
                                prev();
                            }}
                        >
                            <img className='back-button' style={{height: '1.5rem'}} src={forward} alt="back" />
                        </button>
                        <button
                            onClick={togglePlayPause}
                            className='play-pause'
                        >
                            {isPlaying? 
                                <img style={{height: '2.2rem'}} src={pause} alt="Pause/Play" />:
                                <img style={{height: '2.2rem'}} src={play} alt="Pause/Play" />}
                        </button>
                        <button
                            className='track-change'
                            onClick={()=>{
                                if(currentTrack === null) return; 

                                let next = trackManager[currentPlaylist][currentTrack + 1];
                                if(!next) next = trackManager[currentPlaylist][0];
                                
                                next();
                            }}
                        >
                            <img style={{height: '1.5rem'}} src={forward} alt="forward" />
                        </button>
                    </div>
                    <button className='speaker' style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
                        <img src={speaker} alt="sound" />
                        <div className='sound-bar-hover' style={{position: 'absolute', width: '100%', height: '100%', top: 0, left:0}}></div>
                        <div className='sound-bar-container'>
                            <input 
                                className='sound-bar' type="range" 
                                defaultValue={100}
                                onChange={(event)=>{
                                    setSound(event.target.value);
                                }}
                            />
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;