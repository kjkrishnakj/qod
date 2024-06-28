import Head from 'next/head'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Image from "next/image"

import logo from "../public/logo.png"
function addquote() {
  const router = useRouter()

  const [author, setAuthor] = useState();
  const [descr, setDescr] = useState('');
  const handleChange = (e) => {
    if (e.target.name == 'author') {
      setAuthor(e.target.value);
    }
    else if (e.target.name == 'descr') {
      setDescr(e.target.value);
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { author: author, descr }
    let res = await fetch(`http://localhost:3000/api/addquote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    setAuthor('');
    setDescr('');
    toast.success("QOD added Successfully 👍", { autoClose: 1000 })
    setTimeout(() => {
      router.push('/')
    }, 1000)
  }

  return (

    <div>
            <ToastContainer />

      <Head>
        <link href='https://fonts.googleapis.com/css?family=Nunito' />
        <title>QODs | Contribute</title>
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </Head>

      <section className="text-green-500 body-font relative">
        <div className="container px-5 py-12 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
          <Image src={logo} alt="" className='mx-auto mb-2' style={{ height: "4rem", width: "4rem" }}></Image>

            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-green-600">Add a QOD</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Contribute by adding a Quote Of the Day.</p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="name" className="leading-7 text-sm text-green-500">Author</label>
                  <input onChange={handleChange} value={author} type="text" id="author" name="author" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-green-500 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label htmlFor="descr" className="leading-7 text-sm text-green-500">Description</label>
                  <textarea onChange={handleChange} value={descr} id="descr" name="descr" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 h-32 text-base outline-none text-green-500 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button onClick={handleSubmit} className="flex  mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Contribute</button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a className="text-green-500">Or mail to - krishnajaswl@gmail.com</a>
                 
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default addquote
