import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchSongs() {
    const [songs, setSongs] = useState(null);

    async function fetchSongs() {
        try {
            const data = await axios.get('https://cms.samespace.com/items/songs');
            setSongs(data.data.data);
        }
        catch {
            console.log("Unable to fetch songs");
        }
    }

    useEffect(()=>{
        fetchSongs();
    }, []);

    return songs;
}

export default useFetchSongs;