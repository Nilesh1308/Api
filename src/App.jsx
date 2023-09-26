import {useEffect, useState } from 'react'
import './App.css'
import TurndownService from "turndown";
import ReactMarkdown from 'react-markdown';
//import axios from 'axios'
function App() {
  const [myData, setMyData] = useState([])
  const [selectedGenders, setSelectedGenders] = useState({
    male: true,
    female: true,
  });
  const [markdownContent, setMarkdownContent] = useState("")
  const [query, setQuery]= useState("");
  const [isAscending,setIsAscending]=useState(true);
  
  const showData = async () => {
     const res = await fetch(`https://gorest.co.in/public/v2/users`);
         const d = await res.json()
         setMyData(d)
         console.log(d)
  }
  const ascendingEvent =() =>{
    setIsAscending(!isAscending);
  };
  const sortedData = [...myData]; 
  sortedData.sort((a,b) => {
    if(isAscending){
      return a.name.localeCompare(b.name);
    }
    {
      return b.name.localeCompare(a.name);
    }
  });
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedGenders({
      ...selectedGenders,
      [name]: checked,
    });
  };
  const htmlToMarkdown = (html) => {
    const turndownService = new TurndownService();
    return turndownService.turndown(html);
  };
  useEffect(() => {
    
    const sampleHtml = `
      <div>
        <div>1. Verify&nbsp;that clicking "Print", browser opens the print dialog</div>
        <div><br></div>
        <div>2.&nbsp;Verify&nbsp;the print fetches proper layout content and text does not overlap</div>
        <div><br></div>
        <div>3. Verify that print access history report data is matched with SCE UI data.</div>
        <div><br></div>
        <div><strong>User Story: 261-&nbsp;Print access rights history</strong></div>
      </div>
    `;
    const markdown = htmlToMarkdown(sampleHtml);
    setMarkdownContent(markdown);
  }, []);

  const filteredData = sortedData.filter((user) => {
    if (selectedGenders.male && user.gender === "male") return true;
    if (selectedGenders.female && user.gender === "female") return true;
    return false;
   });
  /* const ascendingEvent =() =>{
    setIsAscending(!isAscending);
  };
   filteredData.sort((a,b) => {
    if(isAscending){
      return a.name.localeCompare(b.name);
    }
    {
      return b.name.localeCompare(a.name);
    }
  });*/
  
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
      <div className="markdown-content">
        <h2>Markdown Content:</h2>
        <pre><ReactMarkdown>{markdownContent}</ReactMarkdown></pre>
      </div>
      <div className='center'>
        <textarea name="edit" value={markdownContent} onChange={(e) => setMarkdownContent(e.target.value)} cols="30" rows="10"></textarea>
      </div>
      {filteredData&&filteredData.filter((user)=>user.name.toLowerCase().includes(query.toLowerCase())).map((user) => {
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