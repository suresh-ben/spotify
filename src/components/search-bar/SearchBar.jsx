import { useState, useContext, useEffect} from 'react';
import './SearchBar.css';

import SearchSongContext from '../../context/SearchSongContext';

function SearchBar() {
    const { setSearchLine } = useContext(SearchSongContext);
    useEffect(()=>{
        setSearchLine('');
    }, [])

    return(
        <input 
            type="search" 
            className='search-bar' 
            defaultValue={''}
            placeholder='Search Song, Artist'
            onChange={(event)=> {
                setSearchLine(event.target.value);
                console.log(event.target.value);
            }}
        />
    );
}

export default SearchBar;