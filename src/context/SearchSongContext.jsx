import { createContext, useState } from 'react';

const SearchSongContext = createContext();

export const SearchSongProvider = ({children}) => {
    const [searchLine, setSearchLine] = useState(null);

    return <SearchSongContext.Provider
        value={{searchLine, setSearchLine}}
    >
        {children}
    </SearchSongContext.Provider>
}

export default SearchSongContext;