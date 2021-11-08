import React, { useEffect, useState } from "react";
import { db } from "../../data/db";
import "./Jadwal.css";
import Carousel from 'react-elastic-carousel'


const box = "gradient-box h-60 w-68 lg:h-72 lg:w-96 bg-krem2 border border-oren2 rounded-3xl relative"
const cont1 = "bg-gradient-to-r from-krem via-krem3 to-krem3  p-2 bg-krem3 rounded-3xl mx-6 my-4 border-white border"
const cont2 = "mt-2 h-20 mb-12 grid grid-cols-5 justify-item-center text-center content-center"
const cont3 = "col-span-2 grid grid-row-2 font-bold justify-item-center"



const Jadwal = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsFromFirebase = [];
    // const date = new Date();
    const subscriber = db
      .collection("dataJadwal")
      .orderBy("time", "asc")
      // .where("time" ,">", date)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().time.toDate() > new Date()) {
            getPostsFromFirebase.push({
              ...doc.data(), //spread operator
              key: doc.id, // `id` given to us by Firebase
            });
          }
        });
        setPosts(getPostsFromFirebase);
      });

    // return cleanup function
    return () => subscriber();
  }, []); // empty dependencies array => useEffect only called once

  return (
    <div className="w-screen grid-cols-9 grid">
      <button
        className={"transform transition duration-300 md:hover:scale-110 col-span-1 relative lg:w-16 lg:h-16 w-12 h-12 bg-biru -translate-x-1/4 -translate-y-1/2 rounded-full button"}
        onClick={() => posts.carousel.slidePrev()}>
        <img
          src={`${process.env.PUBLIC_URL}/images/Sec6/left-arrow.png`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            height: "2rem"
          }}
          alt="" />
      </button>

      {posts.breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 550, itemsToShow: 1 },
        { width: 800, itemsToShow: 1 },
        { width: 850, itemsToShow: 2 },
        { width: 1450, itemsToShow: 2 },
      ],


        posts.length > 0 ? (

          <Carousel className="col-span-7" breakPoints={posts.breakPoints} ref={ref => (posts.carousel = ref)} >
            {posts.map((post) =>
              <div className="relative" key={post.key}>
                <div className="relative mb-8">
                  <div className={box}>
                    <div className={cont1}>
                      <div>
                        <p className="overflow-hidden text-sm lg:text-2xl font-nuku w-full text-center cabor">
                          {post.cabor}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold font-sansPro text-lg mb-4">{post.category}</p>
                    <div className={cont2}>
                      <div className={cont3} >
                        <p className="overflow-hidden text-md"> {post.party1} </p>
                      </div>
                      <div className="h-full grid content-evenly text-3xl font-nuku">
                        <div className="vs"> VS </div>
                      </div>
                      <div className={cont3} >
                        <p className="overflow-hidden text-md"> {post.party2} </p>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center'>
                    <div className="gradient border-white border -bottom-8 rounded-full bg-opacity-100 w-48 h-20 absolute grid text-center text-lg content-center font-sansPro">
                      <p className="text-merah"> {post.jam} </p>
                      <p className="text-biru"> {post.tanggal} </p>
                      <p className="text-merah"> {post.tempat} </p>
                    </div>
                  </div>
                </div>
              </div>)
            }
          </Carousel>

        ) : (
          ""
        )}
      <button className={"transform transition duration-300 md:hover:scale-110 col-span-1 relative lg:w-16 lg:h-16  w-12 h-12 bg-biru -translate-x-3/4 -translate-y-1/2 rounded-full button"}
        onClick={() => posts.carousel.slideNext()
        }>
        <img
          src={`${process.env.PUBLIC_URL}/images/Sec6/right-arrow.png`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            height: "2rem"
          }}
          alt="" />
      </button>
    </div>
  );
};

export default Jadwal;
