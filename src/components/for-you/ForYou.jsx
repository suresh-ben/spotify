import './ForYou.css';

import Track, {TrackSkeleton} from '../track';

function ForYou({songs}) {

    return (
        <div className='for-you'>
            {songs && songs.map((song, i)=>{
                return <Track song={song} key={i}/>
            })}
            {!songs && Array(10).fill(0).map((_, i)=>{
                return <TrackSkeleton key={i}/>
            })}
        </div>
    )
}

export default ForYou;