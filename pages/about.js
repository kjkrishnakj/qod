import Head from 'next/head'
import React from 'react'

function about() {
    return (
        <div >
            <Head>
                <link href='https://fonts.googleapis.com/css?family=Nunito' />
                <title>QODs | About</title>
                <link rel="icon" href="/icon.ico" type="image/x-icon" />
            </Head>
            <div className=" bg-gray-900  flex flex-col justify-center items-center" style={{height:"100vh"}}>
                <h1 className="text-2xl font-bold text-green-500 mb-4">
                    Welcome to the QOD - Quote Of the Day
                </h1>
                <p className="text-lg text-green-500 text-center">
                    An intellectual website where you can find some of the featured quotes tagged with their respective author. It also gives a feature of searching any quote using its author.
                </p>
                <p className="mt-4 text-lg text-green-500 text-center">
                    Moreover, QOD offers a registration system that helps to break the distance between you and us.
                </p>
            </div>


        </div>
    )
}

export default about
