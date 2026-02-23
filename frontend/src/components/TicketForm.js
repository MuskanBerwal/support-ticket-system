import React, {useState} from "react";
import API from "../api";

export default function TicketForm({refresh}){

 const [title,setTitle]=useState("");
 const [description,setDescription]=useState("");

 const [category,setCategory]=useState("general");
 const [priority,setPriority]=useState("low");

 const classify = async()=>{

   const res = await API.post("classify/",{description});

   setCategory(res.data.suggested_category);
   setPriority(res.data.suggested_priority);
 };

 const submit = async()=>{

   await API.post("",{
     title,
     description,
     category,
     priority
   });

   refresh();
 };

 return(
  <div>

   <input onChange={(e)=>setTitle(e.target.value)} />

   <textarea onBlur={classify}
    onChange={(e)=>setDescription(e.target.value)} />

   <select value={category}
     onChange={(e)=>setCategory(e.target.value)}>

     <option>billing</option>
     <option>technical</option>
     <option>account</option>
     <option>general</option>

   </select>

   <select value={priority}
    onChange={(e)=>setPriority(e.target.value)}>

    <option>low</option>
    <option>medium</option>
    <option>high</option>
    <option>critical</option>

   </select>

   <button onClick={submit}>Submit</button>

  </div>
 );
}