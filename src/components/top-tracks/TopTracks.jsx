import { useEffect, useState } from 'react';
import './TopTracks.css';

import Track, { TrackSkeleton } from '../track';

function TopTracks({songs}) {

    const [topTracks, setTopTracks] = useState([]);

    useEffect(()=>{
        if(!songs) return;

        let tempTopTracks = [];
        for(let i = 0; i < songs.length; i++) {
            if(songs[i].top_track)
                tempTopTracks.push(songs[i]);
        }

        setTopTracks(tempTopTracks);

    }, [songs]);

    return (
        <div className='top-tracks'>
            {topTracks && topTracks.map((song, i)=>{
                return <Track song={song} trackIndx={i} trackId={'top-tracks'} key={i}/>
            })}
            {!songs && Array(10).fill(0).map((_,i)=>{
                return <TrackSkeleton key={i} />
            })}
        </div>
    );
}

export default TopTracks;