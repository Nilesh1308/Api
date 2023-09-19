import { useEffect,useState } from 'react'
import './App.css'
//import axios from 'axios'
function App() {
  const [myData, setMyData] = useState([])
  const [selectedGenders, setSelectedGenders] = useState({
    male: false,
    female: false,
  });
  const [query, setQuery]= useState("");
  
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

  return (
    <>
  <h1>Data</h1>
  <button type="button" className="btn btn-success"onClick={showData}>Fetch Data</button>
  <div>
  <input type= "text" placeholder="Search.." className="search" onChange={(e)=> setQuery(e.target.value)}/>
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

      {filteredData&&filteredData.filter((user)=>user.name.toLowerCase().includes(query)).map((user) => {
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