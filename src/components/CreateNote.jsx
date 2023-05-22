import React, { useEffect, useState } from "react";


function CreateNote(props) {
  const [note, setNote] = useState({ title: "", content: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(()=>{
    if(props.data.update){
      console.log("In data Update Arrived");
      setNote({
        title:props.data.title,
        content:props.data.content
      })
    }
  },[props.data]);


  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const validate = (values) => {
    if (values.title.trim() === "") {
      setFormErrors((prevError) => {
        return {
          title:"Title is Required"
        };
      });
      return true;
    }
    if (values.content.trim() === "") {
      setFormErrors((prevError) => {
        return {
          content:"Content is Required"
        };
      });
      return true;
    }
    return false;
  };

  function submitNote(event) {
    event.preventDefault();

    if (validate(note)) {
      return;
    }

    if(props.data.update){
        props.onUpdate({
          id:props.data.id,
          ...note
        });

        props.onUpdateStatus(false,{});

        setNote({
          title:'',
          content:''
        })
    }else{

      props.onAdd(note);
      setNote({
        title: "",
        content: "",
      });
    }

      setFormErrors({});
  }

  return (
    <div>
      <form onSubmit={submitNote}>
        <div>
          <input
            name="title"
            required
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
          <p className="errormsg">{formErrors.title}</p>
        </div>
        <div>
          <textarea
            name="content"
            required
            onChange={handleChange}
            value={note.content}
            placeholder="Take a note..."
            rows="3"
          />
          <p className="errormsg">{formErrors.content}</p>
        </div>
        
        <button>{props.data.update? "Update": "Add"}</button>
      </form>
    </div>
  );
}

export default CreateNote;
