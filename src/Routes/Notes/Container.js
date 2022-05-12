import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from '../../components/Notes/NotesList';
import Search from '../../components/Notes/Search';
function Container() {

    const [notes, setNotes] = useState([{
        id: nanoid(),
        text: "This is my first note",
        date: "12/04/2020"
    },
    {
        id: nanoid(),
        text: "This is my second note",
        date: "12/04/2020"
    },
    {
        id: nanoid(),
        text: "This is my third note",
        date: "12/04/2020"
    },
    {
        id: nanoid(),
        text: "This is my fourth note",
        date: "12/04/2020"
    },

    ]);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));
        if (savedNotes) {
            setNotes(savedNotes);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
    }, [notes]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: nanoid(),
            text: text,
            date: date.toLocaleDateString()

        };

        const newNotes = [...notes, newNote];
        setNotes(newNotes);

    };
    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id != id);
        setNotes(newNotes);
    };

    return (
        <div className='container'>
            <Search handleSearchNote={setSearchText} />
            <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} handleAddNote={addNote} handleDeleteNote={deleteNote} />

        </div>
    )
}
export { Container };
