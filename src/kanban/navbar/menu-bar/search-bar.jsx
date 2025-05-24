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
          <ul className='absolute shadow-md rounded-2xl mt-1 p-2 px-4 z-30 bg-gray-200 w-[87%]'>
            {searchedData.map((item, i) => (
              <NavLink
                to={`/project/${item.projectId}`}
                key={item.projectId}
              >
                <li 
                  key={item.projectId}
                  className="hover:text-blue-600 w-max mb-0.5"
                >{item.projectName}</li>
              </NavLink>
            ))}
          </ul>
        ) : (<p className='absolute shadow-md rounded-2xl mt-2 p-2 px-4 z-30 bg-gray-200 w-[87%]'>No data found!</p>)
      ) : null}
    </div>
  )
}

export default SearchBar