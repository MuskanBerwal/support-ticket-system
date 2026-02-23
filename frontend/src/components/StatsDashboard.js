import React,{useEffect,useState} from "react";
import API from "../api";

export default function StatsDashboard(){

 const [stats,setStats]=useState({});

 useEffect(()=>{
   load();
 },[]);

 const load = async()=>{
   const res = await API.get("stats/");
   setStats(res.data);
 };

 return(
  <div>
   Total: {stats.total_tickets}
   Open: {stats.open_tickets}
  </div>
 );
}