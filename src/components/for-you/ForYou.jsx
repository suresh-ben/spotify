import { useEffect, useRef, useState } from 'react';
import Track, {TrackSkeleton} from '../track';

import './ForYou.css';

function ForYou({songs}) {

    return (
        <div className='for-you'>
            {songs && songs.map((song, i)=>{
                return <Track song={song} trackIndx={i} trackId={'for-you'} key={i}/>
            })}
            {!songs && Array(10).fill(0).map((_, i)=>{
                return <TrackSkeleton key={i}/>
            })}
        </div>
    )
}

export default ForYou;