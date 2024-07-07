import Quote from "../models/Quote";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import Link from "next/link";
import mongoose from "mongoose";

export default function Home({ quotes,rQuote }) {
  const fetchQuotes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getquotes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };


  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <Head>
        <link href='https://fonts.googleapis.com/css?family=Nunito' />
        <title>QODs | Home</title>
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
      </Head>
      <div className="bg-gray-900">
      <div className="container px-5 py-12 mx-auto">
        <h1 className="text-2xl font-bold mt-1 text-white mb-2">Quote of the Day</h1>
        <div className="border p-4 my-4 rounded-lg bg-green-100">
          <p className="text-lg italic">{`"${rQuote.descr}"`}</p>
          <span className="block text-right mt-2">- {rQuote.author}</span>
        </div>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-6 mx-auto">
          <h1 className="text-2xl font-bold text-white mt-1 mb-2">Featured Quotes</h1>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
            {quotes.map((k) => (
              <div key={k._id} className="group border-spacing-2 my-3 rounded-lg border shadow-2xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105">
                <div className="bg-green-500" style={{ height: '0.75cm', width: '100%' }}></div>
                <div className="mt-4">
                  <p className="mb-7 text-white mt-3 mx-3 px-1">{`"${k.descr}"`}</p>
                  <span className={`${k.author ? 'bg-green-500' : ''} text-white px-3 py-1 tracking-widest text-xs absolute right-0 bottom-0 rounded-bl`}>{`- ${k.author}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let quotes = await Quote.find();
  
  
  const RI = Math.floor(Math.random() * quotes.length);
  const rQuote = quotes[RI];

  return {
    props: { quotes: JSON.parse(JSON.stringify(quotes)) , rQuote: JSON.parse(JSON.stringify(rQuote)) }
  };
}