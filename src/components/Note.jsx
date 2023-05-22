import React from "react";

function Note(props){
    function handleClick(){
        props.onDelete(props.id);
    }

    function updateHandle(){
        props.onUpdate(true,{
            id:props.id,
            title:props.title,
            content:props.content
        });
    }

    return(
        <div className="note">
            <h1>{props.title}</h1>
            <p>{props.content}</p>
            <button onClick={handleClick}>Delete</button>
            <button onClick={updateHandle}>Update</button>            
            
        </div>
    );
}

export default Note;