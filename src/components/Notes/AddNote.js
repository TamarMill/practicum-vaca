
import { useState } from "react";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
const AddNote = ({ handleAddNote }) => {
    const [noteText, setNoteText] = useState('');
    const handleChange = (event) => {
        setNoteText(event.target.value);
    };
    const handleSaveClick = () => {
        if (noteText.trim().length > 0) {
            handleAddNote(noteText);
            setNoteText('');
        }
    }
    return (<div className="note new">
        <Input
            disableUnderline="true"
            rows='8'
            cols='10'
            placeholder='Type to add a new note'
            value={noteText}
            onChange={handleChange}>
        </Input>
        <div className="note-footer">
            <Button className="save" onClick={handleSaveClick}>Save</Button>
        </div>

    </div >
    );

};
export default AddNote;