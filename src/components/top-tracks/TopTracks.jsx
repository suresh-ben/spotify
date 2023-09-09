import './TopTracks.css';

import Track, { TrackSkeleton } from '../track';

function TopTracks({songs}) {
    return (
        <div className='top-tracks'>
            {songs && songs.map((song, i)=>{
                if(song.top_track)
                    return <Track song={song} key={i}/>
            })}
            {!songs && Array(10).fill(0).map((_,i)=>{
                return <TrackSkeleton key={i} />
            })}
        </div>
    );
}

export default TopTracks;