import { useState, useEffect } from "react";
import { db } from "../data/db";
import { Hasil } from '../Components/CaborDetail'
const assetsCaborDetail = `${process.env.PUBLIC_URL}/images/CaborDetail`;

const Card = (props) => {
  const data = props.data;
  if (!data.faculty1) {
    data.faculty1 = "Error";
  }
  if (!data.faculty2) {
    data.faculty2 = "Error";
  }

  const LogoSupporter = (props) => {
    const [logo, setLogo] = useState(props.logo.toLowerCase());
    return (
      <div className="hidden sm:block w-14 h-14 lg:w-20 lg:h-20 xl:w-28 xl:h-28 rounded-full">
        <img
          onError={() => setLogo("undefined")}
          className="w-full h-full rounded-full"
          src={`${assetsCaborDetail}/supporter/${logo}.png`}
          alt=""
        />
      </div>
    );
  };

  const Player = (props) => {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        {props.player && (
          <p className="mb-1 text-xl lg:text-3xl xl:text-4xl font-semibold text-center">
            {props.player}
          </p>
        )}
        <p
          className={`${
            !props.player
              ? "text-xl lg:text-3xl xl:text-4xl font-semibold text-center"
              : "lg-text-xl xl:text-2xl"
          }`}
        >
          {props.faculty}
        </p>
      </div>
    );
  };

  return (
    <div className="my-7 sm:my-10 lg:my-20">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-t-3xl">
        <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-4 lg:text-xl xl:text-2xl">
          <p className="py-2">{data.date}</p>
          {data.isFinished && (
            <p className="px-10 py-2 rounded-xl bg-birdong text-white">
              Selesai
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center px-2 sm:px-8 py-4 sm:py-12 mt-1 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-b-3xl">
        <LogoSupporter logo={data.faculty1.split(" (")[0]} />
        <div className="flex flex-col items-center w-full sm:flex-1 mx-3 lg:mx-8 xl:space-y-3">
          <div className="flex flex-col sm:flex-row w-full mb-5 sm:mb-0 justify-center items-center">
            <Player player={data.player1} faculty={data.faculty1} />
            <p className="mx-8 my-3 text-xl lg:text-xl xl:text-3xl">VS</p>
            <Player player={data.player2} faculty={data.faculty2} />
          </div>
          <p className="opacity-50 lg:text-xl xl:text-2xl uppercase">
            {data.phase}
          </p>
          <p className="lg-text-xl xl:text-2xl uppercase">{data.venue}</p>
          {data.isFinished && data.winner && (
            <p className="lg-text-xl xl:text-2xl">Pemenang: {data.winner}</p>
          )}
        </div>
        <LogoSupporter logo={data.faculty2.split(" (")[0]} />
      </div>
    </div>
  );
};

const CaborDetail = (props) => {
  const id = props.match.params.id;
  const [caborHeader, setCaborHeader] = useState({});
  const [caborData, setCaborData] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    console.log(id)
  }, [])

  useEffect(() => {
    const getData = async () => {
      const headerData = (
        await db.collection("dataCabor").doc(id).get()
      ).data();
      const querySnapshot = await db
        .collection("dataCabor")
        .doc(id)
        .collection("schedule")
        .get();
      const data = querySnapshot.docs.map((doc) => doc.data());
      if (data.length) {
        let category = data[0].category;
        if (!selectedCategory) {
          setSelectedCategory(data[0].category);
        } else {
          category = selectedCategory;
        }
        setSchedule(data.filter((item) => item.category === category)[0].data);
        setCaborData(data);
      }
      setCaborHeader(headerData);
    };
    getData();
  }, [id, selectedCategory]);

  const selectCategoryHandler = (category) => {
    setSelectedCategory(category);
    setSchedule([]);
    setShowCategory(false);
  };

  return (
    <div className="pt-14 lg:pt-0 relative bg-merah min-w-full px-5 overflow-hidden">
      <div className="flex items-center h-full lg:min-h-screen">
        <img
          style={{ width: "3%" }}
          src={`${assetsCaborDetail}/jpn-${id}.png`}
          alt=""
        />
        <div className="relative" style={{ width: "45%" }}>
          <img src={`${assetsCaborDetail}/circle-biru.svg`} alt="" />
          <div
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            style={{ width: "70%" }}
          >
            <h1 className="md:mb-2 lg:mb-4 xl:mb-8 font-bold sm:text-2xl md:text-4xl lg:text-5xl uppercase">
              {id}
            </h1>
            <p className="hidden lg:block lg:text-xl">
              {caborHeader.description}
            </p>
          </div>
        </div>
        <img
          className="relative ml-auto w-1/2"
          src={`${assetsCaborDetail}/cover-${id}.png`}
          alt=""
        />
      </div>
      <img
        className="z-0 absolute w-3/4 right-0"
        src={`${assetsCaborDetail}/rumah.png`}
        alt=""
      />
      <div className="flex flex-col justify-center md:px-20 pt-8">
        <div className='flex flex-row items-center justify-between'>
          {selectedCategory && (
            <div
              className={`z-10 relative bg-white sm:min-w-max sm:w-1/3 ${
                showCategory
                  ? "rounded-t-3xl"
                  : "bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl"
              } py-3 lg:text-xl xl:text-2xl`}
              style={{
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => setShowCategory((prevState) => !prevState)}
              >
                <p className="px-6 py-3 opacity-50">{selectedCategory}</p>
                <div className="flex justify-center px-4 border-l border-black border-opacity-60">
                  <img
                    className={`py-3 ${
                      showCategory ? "transition transform rotate-180" : ""
                    }`}
                    style={{ width: "60%" }}
                    src={`${assetsCaborDetail}/dropdown.svg`}
                    alt=""
                  />
                </div>
              </div>
              {showCategory && (
                <div
                  className="absolute w-full bg-white rounded-b-3xl mt-3 pb-3"
                  style={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}
                >
                  {caborData.length &&
                    caborData.map((data) => (
                      <p
                        key={data.category}
                        className="px-6 py-3 opacity-50 cursor-pointer"
                        onClick={() => selectCategoryHandler(data.category)}
                      >
                        {data.category}
                      </p>
                    ))}
                </div>
              )}
            </div>
          )}
          <Hasil id={id} />
        </div>
        <div className="self-center w-full font-sansPro">
          {schedule.map((data, index) => (
            <Card key={index} data={data} />
          ))}
          {schedule.length === 0 && <div style={{height: `${caborData.length * 70}px`}}></div>}
        </div>
      </div>
    </div>
  );
};

export { CaborDetail };
