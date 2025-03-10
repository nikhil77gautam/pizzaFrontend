import React from 'react'

const NavCategory = ({scrollToVeg, scrollToNonVeg, scrollToBeverages, scrollToDesserts }) => {
  return (
    <div>
       <nav className=" fixed w-full bg-gray-800 text-white py-2 z-10 ">
        <ul className="flex justify-start space-x-4 ml-4">
          <li>
            <button className="text-white hover:text-yellow-400 focus:outline-none bg-transparent border-none" onClick={scrollToVeg}>Veg</button>
          </li>
          <li>
            <button className="text-white hover:text-yellow-400 focus:outline-none bg-transparent border-none" onClick={scrollToNonVeg}>Non-Veg</button>
          </li>
          <li>
            <button className="text-white hover:text-yellow-400 focus:outline-none bg-transparent border-none" onClick={scrollToBeverages}>Beverages</button>
          </li>
          <li>
            <button className="text-white hover:text-yellow-400 focus:outline-none bg-transparent border-none" onClick={scrollToDesserts}>Desserts</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavCategory
