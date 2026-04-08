import React from 'react'
import { Search } from 'lucide-react';
import "./PatientList.css"
function PatientsList({handleUserList,searchText,HandleSearch}) {
  return (
    <div>
       <div className='rightcontainer'>
        <div className="searchBar">
        <h3>Patients</h3>
        <input type="text" name='name' value={searchText}  onChange={(e)=>HandleSearch(e.target.value)} />
        <button className="icon-btn" onClick={()=>HandleSearch(searchText)}>
           <Search />
          </button>
        </div>
        <div className="listcontainer">
            {handleUserList()}
        </div>
      </div>
    </div>
  )
}

export default PatientsList
