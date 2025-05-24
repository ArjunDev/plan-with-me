import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

const SearchBar = ({allProjectNames = []}) => {

  const [searchItem, setSearchItem] = useState("");
  const [searchedData, setSearchedData] = useState("")
  // console.log(allProjectNames)

  useEffect(() => {
    const searchedProjects = allProjectNames.filter(item =>
      item.projectName.toLowerCase().includes(searchItem.toLowerCase())
    );
    setSearchedData(searchedProjects);
  }, [searchItem]);

  return (
    <div>
      <input 
        type="search"
        value={searchItem}
        onChange={(e)=>setSearchItem(e.target.value)}
        placeholder='Search a project by name'
        className='shadow-md shadow-blue-300 border rounded-2xl w-[75%] mt-4 p-1 px-2 pl-4 active:border-blue-500'
      />
      {searchItem.trim() !== "" ? (
        searchedData.length > 0 ? (
          <ul className='px-2'>
            {searchedData.map((item, i) => (
              <NavLink
                to={item.projectId}
                key={item.projectId}
              >
                <li 
                  key={item.projectId}
                  className="hover:text-blue-600 w-max"
                >{item.projectName}</li>
              </NavLink>
            ))}
          </ul>
        ) : (<p>No data found!</p>)
      ) : null}
    </div>
  )
}

export default SearchBar