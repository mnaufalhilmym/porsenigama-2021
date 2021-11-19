import { useState, useEffect } from "react";
import React from "react";
import { db } from "../../data/db";

const Hasil = (props) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [standingsRef, setStandingsRef] = useState([]);
  let filter = props.id;

  useEffect(() => {
    const medalsData = db
      .collection("standings/" + props.id + "/cabang")
      .orderBy("name")
      .onSnapshot((snap) => {
        let data = snap.docs.map((doc) => doc.data());
        setStandingsRef(data);
        return medalsData();
      });
  }, [filter]);

  // useEffect(() => {
  // // let toprint = standingsData[0]
  //     console.log(standingsRef);
  // }, [standingsRef])

  return (
    <>
      {standingsRef.length > 0 && (
        <div className="relative z-50">
          <p className="text-center font-sansPro">
            <button
              onClick={() => setVisiblePopup(!visiblePopup)}
              className="rounded-xl p-2 border-2 bg-biru text-white text-2xl transform scale-90 md:scale-100 transition duration-300 md:hover:scale-105"
            >
              Peraihan Medali
            </button>
          </p>
          {visiblePopup ? (
            <div
              className="fixed top-0 left-0 flex items-center justify-center"
              style={{
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(0,0,0,0.2)",
              }}
              onClick={() => setVisiblePopup(!visiblePopup)}
            >
              <div
                className="bg-white border-2 border-ungugaje min-h-24 font-sansPro rounded-4xl w-5/6 md:pr-10"
                style={{
                  backgroundImage: `url('${process.env.PUBLIC_URL}/images/News/Group 51.png')`,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => setVisiblePopup(!visiblePopup)}
                    className="md:mx-4 my-4 bg-merah text-kuning text-3xl md:text-2xl rounded-xl px-8 py-2 font-nuku transform scale-50 md:scale-100 transition duration-300 md:hover:scale-105"
                    style={{
                      textShadow: [
                        "1.5px 1.5px 0 #000",
                        "1.5px -1.5px 0 #000",
                        "-1.5px 1.5px 0 #000",
                        "-1.5px -1.5px 0 #000",
                      ],
                    }}
                  >
                    Tutup
                  </button>
                </div>
                {standingsRef.length > 0 && (
                  <div className="mx-4 my-4 grid grid-flow-col auto-cols-max overflow-x-auto font-sansPro text-black text-base md:text-2xl font-semibold">
                    {standingsRef.map((cabang, index) => (
                      <div className="p-4 border-2 border-ungugaje bg-krem m-2 rounded-xl">
                        <p
                          className="text-2xl md:text-fivevh uppercase font-bold text-kuning"
                          style={{
                            textShadow: [
                              "1.5px 1.5px 0 #000",
                              "1.5px -1.5px 0 #000",
                              "-1.5px 1.5px 0 #000",
                              "-1.5px -1.5px 0 #000",
                            ],
                          }}
                        >
                          {cabang.name}
                        </p>
                        <p className="flex">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/Standings/Mendali gold.png`}
                            alt="Tabel perolehan medali emas"
                            className="transform w-5 h-6 md:w-10 md:h-11"
                          />
                          {cabang.gold}
                        </p>
                        <p className="flex">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/Standings/Mendali silver.png`}
                            alt="Tabel perolehan medali emas"
                            className="transform w-5 h-6 md:w-10 md:h-11"
                          />
                          {cabang.silver}
                        </p>
                        <p className="flex">
                          <img
                            src={`${process.env.PUBLIC_URL}/images/Standings/Mendali bronze.png`}
                            alt="Tabel perolehan medali emas"
                            className="transform w-5 h-6 md:w-10 md:h-11"
                          />
                          {cabang.bronze}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export { Hasil };
