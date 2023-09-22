import { useEffect,useState } from 'react'
import './App.css'
//import axios from 'axios'
function App() {
  const [myData, setMyData] = useState([])
  const [selectedGenders, setSelectedGenders] = useState({
    male: true,
    female: true,
  });
  const [query, setQuery]= useState("");
  const [isAscending,setIsAscending]=useState(true);
  
  const showData = async () => {
     const res = await fetch(`https://gorest.co.in/public/v2/users`);
         const d = await res.json()
         setMyData(d)
         console.log(d)
  }

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedGenders({
      ...selectedGenders,
      [name]: checked,
    });
  };
  const filteredData = myData.filter((user) => {
    if (selectedGenders.male && user.gender === "male") return true;
    if (selectedGenders.female && user.gender === "female") return true;
    return false;
   });
   const ascendingEvent =() =>{
    setIsAscending(!isAscending);
  };
  const sortedData = [...filteredData];
  sortedData.sort((a,b) => {
    if(isAscending){
      return a.name.localeCompare(b.name);
    }
    else {
      return b.name.localeCompare(a.name);
    }
  });
  
  return (
    <>
  <h1>Data</h1>
  <button type="button" className="btn btn-success mx-1"onClick={showData}>Fetch Data</button>
  <button type="button" className="btn btn-success mx-1"onClick={ascendingEvent}>{isAscending ? "Sort Descending": "Sort Ascending"}</button>
  <div>
  <input type= "text" placeholder="Search.." className="search my-1" onChange={(e)=> setQuery(e.target.value)}/>
  </div>
  <div>
        <label>
          Male
          <input type="checkbox" name="male" checked={selectedGenders.male} onChange={handleCheckboxChange}/>
        </label>
        <label>
          Female
          <input type="checkbox" name="female" checked={selectedGenders.female} onChange={handleCheckboxChange}/>
        </label>
      </div>

      {sortedData&&sortedData.filter((user)=>user.name.toLowerCase().includes(query.toLowerCase())).map((user) => {
        const { id, name, email, gender, status } = user;
        return (
          <div className="card" key={id}>
            <h4>Name: {name}</h4>
            <h4>Email: {email}</h4>
            <h4>Gender: {gender}</h4>
            <h4>Status: {status}</h4>
          </div>
        );
      })}
    </>
  );
};
    
  


export default App