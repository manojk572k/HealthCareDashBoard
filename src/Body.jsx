import { useEffect, useState } from "react";
import "./Body.css"
import BloodPressure from "./BloodPressure"
import { MoreHorizontal } from "lucide-react";
import DiagnosticList from "./DiagnosticList";
import PatientDetails from "./PatientDetails";
import PatientsList from "./PatientsList";
import { PatientLabTests } from "./PatientDetails";

function Body() {
    
  const[user,setUser]=useState([])    
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState("") 
  const[search,setSearch]=useState("")

  /////when a user is going to click any patient name it should display the whole patients data in the window//////
  const [selectedPatient, setSelectedPatient] = useState(null)

  /////that is the goal/////

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
      setSelectedPatient(data[0])
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
    return filteredSearch.map((User) => (
      
      <div 
          key={User.id}
          className="PatientList"
          onClick={() => setSelectedPatient(User)}
      >
      <img
      src={User.profile_picture}
      className="ProfilePicture"
      alt={User.name}
    />

    <div className="PatientData">
      <p className="PatientName">{User.name}</p>
      <p className="PatientMeta">
        {User.gender}, {User.age}
      </p>
    </div>

    <button className="PatientMoreBtn" type="button" aria-label="More options">
      <MoreHorizontal size={20} />
    </button>
      </div>
      
    ));
  };

  const filteredSearch =user.filter((User)=>{
    return User.name.toLowerCase().includes(search.toLowerCase())
  })
  const HandleSearchSubmit=(value)=>{
    setSearch(value)
  }

  return (
    <div className='container'>
      <PatientsList 
        handleUserList={renderUserList}
        searchText={search}
        HandleSearch={HandleSearchSubmit}
        onSelectPatient={setSelectedPatient}
      />
      <div className='middlecontainer'>
        <div className="top-section">
             <BloodPressure data={selectedPatient?.diagnosis_history || []} />
         </div>
         <div className="bottom-section">
            <DiagnosticList data={selectedPatient?.diagnostic_list || []} />
         </div>
      </div>
      <div className='leftcontainer'>
        <PatientDetails data={selectedPatient}/>
        <PatientLabTests data={selectedPatient?.diagnostic_list || []}/>
      </div>
    </div>
  )
}

export default Body
