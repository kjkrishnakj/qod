import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import LoadingBar from 'react-top-loading-bar'

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const router = useRouter()
  const [key, setKey] = useState()

  const [progress, setProgress] = useState(0)


  const logout = () => {
    localStorage.removeItem('token')
    setUser({ value: null })

    setKey(Math.random())
    router.push('/login')
  }
  useEffect(() => {
    // const em = localStorage.getItem('email')
    // setEmail(em)
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  const token = localStorage.getItem('token');
    if (token) {
      setUser({ value: token })
    }
    setKey(Math.random());
  }, [router.query]);
  return (
  <>
 <LoadingBar color="#22C55E" progress={progress} waitingTime={200} onLoaderFinished={() => setProgress(0)}/>
  
  <Navbar logout={logout} user={user}/>
  <Component logout={logout} user={user} {...pageProps} />
  <Footer/>
  </>
);
}
