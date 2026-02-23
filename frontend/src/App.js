import TicketForm from "./components/TicketForm.js";
import TicketList from "./components/TicketList.js";
import StatsDashboard from "./components/StatsDashboard.js";

function App(){

 return(
  <div>

   <TicketForm />
   <StatsDashboard />
   <TicketList />

  </div>
 );
}

export default App;
