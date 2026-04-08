import { useEffect, useState } from "react";
import "./Body.css"
import BloodPressure from "./BloodPressure";
import { Search } from 'lucide-react';

function Body() {
    
  const[user,setUser]=useState([])    
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState("") 

  useEffect(()=>{

  const fetchUsers =async()=>{
  try{  
  setLoading(true);
  setError("");
  let username = 'coalition';
  let password = 'skills-test';
  let auth = btoa(`${username}:${password}`);  
  const res = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
    headers: {
      'Authorization': `Basic ${auth}`
    }
  })
    if(!res.ok){
      throw new Error("Failed to fetch data")
    }   
    const data = await res.json()
      setUser(data)
  }  
  catch(error){
      setError(error.message)
  }
  finally{
    setLoading(false)
  }
  }
  fetchUsers()
  },[])

  const renderUserList = () => {
    if (loading) {
      return <p>Loading....</p>;
    }
    if (error) {
      return <p>{error}</p>;
    }
    return user.map((User) => (
      <div key={User.id}>
        <img src={User.profile_picture} alt="ProfilePictures" />
        <p>{User.name}</p>
        <p>{User.gender}</p>
        <p>{User.age}</p>
      </div>
    ));
  };

  return (
    <div className='container'>
      <div className='rightcontainer'>
        <div className="searchBar">
        <h2>Patients</h2>
        <input type="text"  id="" />
        <button className="icon-btn">
           <Search />
          </button>
        </div>
        <div className="listcontainer">
            {renderUserList()}
        </div>
      </div>
      <div className='middlecontainer'>
        <div className="top-section">
             <BloodPressure />
         </div>

         <div className="bottom-section">
            {/* Diagnostic List (future use) */}
         </div>
      </div>
      <div className='leftcontainer'>
        <div className='topleftcontainer'>

        </div>
        <div className='buttomleftcontainer'>

        </div>

      </div>
    </div>
  )
}

export default Body
