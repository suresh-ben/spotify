import { useContext, useEffect, useRef, useState } from 'react';
import './AudioPlayer.css';

import { no_track, dots, speaker, pause, play, forward } from '../../contents/images'
import SelectedSongContext from '../../context/SelectedSongContext';

function AudioPlayer() {

    const { selectedSong, selectedAudio } = useContext(SelectedSongContext);
    const [ percenatgCompleted, setpercentageCompleted] = useState(0);
    const [ prevAudio, setPrevAudio ] = useState(null);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ appliedColor, setAppliedColor] = useState('#000000');
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
                    <div>
                        <button
                            onClick={()=>updateAudioTime(-15)}
                        >
                            <img className='back-button' style={{height: '1.5rem'}} src={forward} alt="back" />
                        </button>
                        <button
                            onClick={togglePlayPause}
                        >
                            {isPlaying? 
                                <img className='play-pause' style={{height: '2.2rem'}} src={pause} alt="Pause/Play" />:
                                <img className='play-pause' style={{height: '2.2rem'}} src={play} alt="Pause/Play" />}
                        </button>
                        <button
                            onClick={()=>updateAudioTime(15)}
                        >
                            <img style={{height: '1.5rem'}} src={forward} alt="forward" />
                        </button>
                    </div>
                    <button style={{backgroundColor: 'rgba(255, 255, 255, 0.15)'}}>
                        <img src={speaker} alt="sound" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;