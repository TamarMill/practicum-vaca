import React from 'react';
import { MdSearch } from 'react-icons/md';
import Input from '@mui/material/Input';

const Search = ({ handleSearchNote }) => {
    return (<div className="search">
        <MdSearch className='search-icons' size='1.3em' />
        <Input disableUnderline="true" onChange={(event) => handleSearchNote(event.target.value)} type="text" placeholder="type to search" />
    </div>
    );

};
export default Search;