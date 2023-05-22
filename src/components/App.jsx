import React, {useState,useEffect} from "react";
import Header from "./Header";

import Note from "./Note";
import CreateNote from "./CreateNote";



function App() {
  const [notes, setNotes] = useState([]);
  const [updates, setUpdates] = useState({});

  useEffect(()=>{

    if(localStorage.getItem("notes") != null){
      setNotes(JSON.parse(localStorage.getItem("notes")));
    }else{
      localStorage.setItem("notes",JSON.stringify([])); 
    }

  },[])

  window.onbeforeunload= ()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
  }

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  const onUpdate = (updateNote)=>{

    console.log(updateNote);

    const newNote = notes.map((note,index) =>{
      if(index === updateNote.id){
        note.title=updateNote.title;
        note.content=updateNote.content
      }

      return note;
    });

    console.log(newNote);

     setNotes([...newNote]);
  }

  const onUpdateStatus=(chanegeUpdate,updateNote)=>{
      setUpdates({
        ...updateNote,
        update:chanegeUpdate
      });

      console.log(updateNote);
  }


  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
    <div>
       <Header />
       </div>
      <CreateNote onAdd={addNote} 
        onUpdate = {onUpdate}
        data={updates}
        onUpdateStatus={onUpdateStatus}
      />
      
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onUpdate={onUpdateStatus}
            onDelete={deleteNote}
          />
        );
      })}
      
    </div>
  );
}

export default App;