import { useState } from 'react';
import useFetchSongs from '../../hooks/useFetchSongs';

import './Home.css';
import { list, cross } from '../../contents/images';

import Navbar from '../../components/nav';
import ForYou from '../../components/for-you'
import TopTracks from '../../components/top-tracks';
import AudioPlayer from '../../components/audio-player';
import SearchBar from '../../components/search-bar/SearchBar';

import { SelectedSongProvider} from '../../context/SelectedSongContext';
import { SearchSongProvider } from '../../context/SearchSongContext';

function Home() {

    const [selectedTab, setSelectedTab] = useState(0);
    const [isTabsOpen, setIsTabsOpen] = useState(true);
    const songs = useFetchSongs();
    //0 - For you
    //1 - Top you

    return (
        <div className='home'>
            <Navbar />
            <button className='music-list'
                onClick={()=>setIsTabsOpen(previousState => !previousState)}
            >
                {isTabsOpen? <img src={cross} alt="list" /> : <img src={list} alt="list" />}
            </button>
            <SelectedSongProvider>
            <SearchSongProvider>
            <div className='home-content'>
                <div 
                    className={`tabs${isTabsOpen? '': ' tabs-close'}`}
                >
                    <div className='tab-names'>
                        <h1
                            style={selectedTab === 0? {opacity: 1} : {opacity:0.5}}
                            onClick={()=>{
                                setSelectedTab(0)
                            }}
                        >
                            For You
                        </h1>
                        <h1
                            style={selectedTab === 1? {opacity: 1} : {opacity:0.5}}
                            onClick={()=>{
                                setSelectedTab(1)
                            }}
                        >
                            Top Tracks
                        </h1>
                    </div>

                    <SearchBar />
                        
                    <div style={{position: 'relative', height: '100%'}}>
                        <div 
                            className={`tab${selectedTab === 0? '': ' for-you-close'}`}
                        >
                            <ForYou songs={songs} />
                        </div>
                        <div 
                            className={`tab${selectedTab === 1? '': ' top-songs-close'}`}
                        >
                            <TopTracks songs={songs} />
                        </div>
                    </div>
                </div>                 
                <AudioPlayer />
            </div>
            </SearchSongProvider>
            </SelectedSongProvider>
        </div>
    );
}

export default Home;