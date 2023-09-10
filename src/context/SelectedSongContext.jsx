import { createContext, useState } from 'react';

const SelectedSongContext = createContext();

export const SelectedSongProvider = ({children}) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedAudio, setSelectedAudioTrack] = useState(null);

    //For next and prev
    const [trackManager, setTrackManager] = useState({});
    const [currentPlaylist, setCurrentPlayList] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

    return <SelectedSongContext.Provider
        value={{
            selectedSong, setSelectedSong, 
            selectedAudio, setSelectedAudioTrack, 
            trackManager, setTrackManager, 
            currentPlaylist, setCurrentPlayList, 
            currentTrack, setCurrentTrack
        }}
    >
        {children}
    </SelectedSongContext.Provider>
}

export default SelectedSongContext;