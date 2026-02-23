import React,{useEffect,useState} from "react";
import API from "../api";

export default function TicketList(){

 const [tickets,setTickets]=useState([]);

 useEffect(()=>{
  load();
 },[]);

 const load= async()=>{
  const res= await API.get("");
  setTickets(res.data);
 };

 return(
  <div>

   {tickets.map(t=>(
    <div key={t.id}>
     {t.title} - {t.priority} - {t.status}
    </div>
   ))}

  </div>
 );
}