import { createContext, useState } from 'react';

const SelectedSongContext = createContext();

export const SelectedSongProvider = ({children}) => {
    const [selectedSong, setSelectedSong] = useState(null);
    const [selectedAudio, setSelectedAudioTrack] = useState(null);

    return <SelectedSongContext.Provider
        value={{selectedSong, setSelectedSong, selectedAudio, setSelectedAudioTrack}}
    >
        {children}
    </SelectedSongContext.Provider>
}

export default SelectedSongContext;