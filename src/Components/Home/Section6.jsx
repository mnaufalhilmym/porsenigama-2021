import { useState, useEffect, React } from "react";
import { db } from "../../data/db";
import Jadwal from "./Jadwal";

const Section6 = () => {


  const [Acara, setAcara] = useState([]);
  useEffect(() => {
    const getAcaraFromFirebase = [];
    const subscriber = db
      .collection("dataJadwal")
      .orderBy("time", "asc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().time.toDate() > new Date()) {
            getAcaraFromFirebase.push({
              ...doc.data(), 
              key: doc.id, 
            });
          }
        });
        setAcara(getAcaraFromFirebase);
      });

    // return cleanup function
    return () => subscriber();
  }, []); // empty dependencies array => useEffect only called once

  return (
    <div className="pt-10 relative bg-krem">
        <div className={Acara != 0 ? "block" : "hidden"}>
          <h2 className="hidden lg:block text-8xl font-nuku text-merah my-16"> Pertandingan Terdekat </h2>
          <div className="pb-20">
            <Jadwal />
          </div>
        </div>
    </div>
  );
 
};

export { Section6 };
