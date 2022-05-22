import { useState, useContext } from 'react';
import { nanoid } from 'nanoid';
import NotesList from '../../components/Notes/NotesList';
import Search from '../../components/Notes/Search';
import { Appcontext } from '../../App';

function Container() {
    const { state, dispatch } = useContext(Appcontext)

    const [searchText, setSearchText] = useState('');


    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()

        };

        dispatch({ type: 'ADD_NOTE', payload: newNote })

    };
    const deleteNote = (id) => {
        dispatch({ type: 'DELETE_NOTE', payload: id })
    };

    return (
        <div className='container'>
            <div style={{ marginTop: '5%' }} >
                <Search handleSearchNote={setSearchText} />
            </div>
            <NotesList notes={state.notes.filter((note) => note.text.toLowerCase().includes(searchText.toLowerCase()))} handleAddNote={addNote} handleDeleteNote={deleteNote} />
        </div>
    )
}
export { Container };
