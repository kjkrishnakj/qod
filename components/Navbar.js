import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from "next/image"

import logo from "../public/logo.png"
import React, { useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Navbar({ user, logout }) {
  const router = useRouter();
  const [found, setFound] = useState('');
  const [togglemodal, setTogglemodal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const data = { searchText }
    let res = await fetch(`http://localhost:3000/api/getauthor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success) {
      setFound(response.quote.descr);
      setTogglemodal(true);

      toast.success("Quote found 👍", { autoClose: 1000 })

    }
    else {
      toast.error("Author not found! 🥲", { autoClose: 1000 })

    }
  };
  const offmodal = () => {
    setTogglemodal(false);
  }




  return (

    <div>
      <ToastContainer />
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Image src={logo} alt="" style={{ height: "4rem", width: "4rem" }}></Image>

            <span className="ml-3 text-green-500 text-4xl">QOD</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-green-400	flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-9  text-green-500 font-bold hover:text-green-700">Qoutes</Link>
            <Link href="/about" className="mr-9 text-green-500 font-bold  hover:text-green-700">About</Link>
            <Link href="/addquote" className="mr-9  text-green-500 font-bold hover:text-green-700">Contribute</Link>

          </nav>

          <div className="relative mr-3 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="flex items-center">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>
              <input value={searchText} onChange={handleSearchChange} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-200 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-600 dark:bg-green-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-600 dark:focus:border-green-600" placeholder="Author" />
              <button type="submit" className="ml-2 p-2 text-sm text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-600 focus:ring-opacity-50">
                Search
              </button>
            </form>
          </div>




          {user && user.value ? (
            <button onClick={logout} className="inline-flex items-center bg-gray-100 border-0 py-3 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Logout
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          ) : (
            <Link href="/login">
              <button className="inline-flex items-center bg-gray-100 border-0 py-3 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Login
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </button>
            </Link>
          )}



        </div>
      </header>

      <div>


        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden={!togglemodal}
          className={`fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden ${togglemodal ? '' : 'hidden'}`}
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">

            <div className="relative bg-white rounded-lg shadow dark:bg-white">
              <div className="flex items-center bg-green-500 justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl  font-semibold text-white  ">
                  Found a Quote by {searchText}
                </h3>
                <button
                  type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={offmodal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14"
                  >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>
              <div className="p-4 md:p-5 text-white dark:text-white space-y-4">

                <p className="text-base leading-relaxed text-gray-700 my-8 dark:text-gray-700">
                  {found}
                </p>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-green-600">
                <button
                  onClick={offmodal}
                  type="button"
                  className="text-white mx-auto bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Thank you
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="bg-green-500 shadow-4xl" />



    </div>
  )
}

export default Navbar
