import "./App.css";
import { Rentals } from "./Components/Rentals/Rentals";
import { AddHouse } from "./Components/AddHouse/AddHouse";
import { useState,useRef,useEffect } from "react";
import axios from "axios";

function App() {
  const [toggle, setToggle] = useState(true)

  const ref = useRef(true)
  
  const toggleHandle = (ref,toggle)=>{
    if(ref.current){
      ref.current = false;
      setToggle(p=>!p);
    }else{
      ref.current = false;
      setToggle(p=>!p);
    }
  }

  

  
  return (
    <div className="App">
      <button onClick={toggleHandle} className="toggleForm">
        { toggle?"Add House":"Show Rentals"/* Show text Add House or Show Rentals based on state */}
      </button>
      {toggle?<Rentals />:<AddHouse/>}
      <br />
    </div>
  );
}

export default App;
