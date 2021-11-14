import { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { db } from "../data/db";
import { Hasil } from "../Components/CabangDetail";
import { dataFotografi } from "../data/dataFotografi";

const assetsCabangDetail = `${process.env.PUBLIC_URL}/images/CabangDetail`;
const assetsCabang = `${process.env.PUBLIC_URL}/images/Cabang`;
const assetsArrow = `${process.env.PUBLIC_URL}/images/Sec1`;

const Modal = ({ modal, setModal, openModal }) => {
  const changeImage = (e, id) => {
    e.stopPropagation();
    if (id === dataFotografi.length) {
      id = 0;
    } else if (id < 0) {
      id = dataFotografi.length - 1;
    }
    openModal(id);
  };

  const Button = ({ arrow }) => {
    return (
      <button
        className="hidden sm:block flex-shrink-0 w-8"
        onClick={(e) =>
          changeImage(e, arrow === "left" ? modal.id - 1 : modal.id + 1)
        }
      >
        <img
          src={`${assetsArrow}/${arrow === "left" ? "Kiri" : "Kanan"}.svg`}
        />
      </button>
    );
  };

  return (
    <div
      className="z-50 fixed flex items-center justify-center w-full h-full pt-11 px-8 bg-gray-900 bg-opacity-70 transition-opacity"
      onClick={() => setModal(false)}
    >
      <div className="flex gap-4 lg:w-3/4 h-3/4">
        <Button arrow="left" />
        <div className="flex flex-col flex-shrink w-full h-full">
          <button className="self-end absolute transform -translate-y-full translate-x-2/3 sm:text-2xl md:text-4xl text-white bg-kuning px-2 rounded-full  z-50">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div
            className="h-full p-8 sm:p-12 bg-white rounded-4xl"
            style={{
              backgroundImage: `url(${assetsCabang}/background.png)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-full flex flex-col items-center overflow-y-auto">
              <img className="sm:w-4/5 sm:h-4/5 object-contain" src={modal.src} />
              <div className="flex flex-col items-center">
                {modal.title && (
                  <p className="mt-8 font-bold text-center text-2xl">{modal.title}</p>
                )}
                <div className="my-6 text-center">
                  <p className="font-bold text-xl">{modal.name}</p>
                  <p>{modal.faculty}</p>
                </div>
                <p className="text-justify">{modal.description}</p>
              </div>
              <button
                className="mt-8 mx-auto px-8 py-3 bg-krem rounded-4xl font-nuku text-kuning text-xl"
                onClick={() =>
                  window.open("https://bit.ly/PengumpulanKaryaFotografi2021")
                }
              >
                Vote
              </button>
            </div>
          </div>
        </div>
        <Button arrow="right" />
      </div>
    </div>
  );
};

const Header = ({ id, cabangHeader }) => {
  return (
    <div className="flex items-center h-full lg:min-h-screen">
      <img
        style={{ width: "3%" }}
        src={`${assetsCabangDetail}/jpn-${id}.png`}
        alt=""
      />
      <div className="relative" style={{ width: "45%" }}>
        <img src={`${assetsCabangDetail}/circle-biru.svg`} alt="" />
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
          style={{ width: "70%" }}
        >
          <h1 className="md:mb-2 lg:mb-4 xl:mb-8 font-bold sm:text-2xl md:text-4xl lg:text-5xl uppercase">
            {id}
          </h1>
          <p className="hidden lg:block lg:text-xl">
            {cabangHeader.description}
          </p>
        </div>
      </div>
      <img
        className="relative ml-auto w-1/2"
        src={`${assetsCabangDetail}/cover-${id}.png`}
        alt=""
      />
    </div>
  );
};

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
          src={`${assetsCabangDetail}/supporter/${logo}.png`}
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
            {(data.player2 || data.faculty2 !== "Error") && (
              <>
                <p className="mx-8 my-3 text-xl lg:text-xl xl:text-3xl">VS</p>
                <Player player={data.player2} faculty={data.faculty2} />
              </>
            )}
          </div>
          <p className="opacity-50 lg:text-xl xl:text-2xl uppercase">
            {data.phase}
          </p>
          <p className="lg-text-xl xl:text-2xl uppercase">{data.venue}</p>
          {data.isFinished && data.winner && (
            <p className="lg-text-xl xl:text-2xl">Pemenang: {data.winner}</p>
          )}
        </div>
        {(data.player2 || data.faculty2 !== "Error") && (
          <LogoSupporter logo={data.faculty2.split(" (")[0]} />
        )}
        {!(data.player2 || data.faculty2 !== "Error") && (
          <div className="w-14 h-14 lg:w-20 lg:h-20 xl:w-28 xl:h-28">
            {data.score1 && (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="lg-text-xl xl:text-2xl">Score:</p>
                <p className="text-xl lg:text-3xl xl:text-4xl font-semibold">
                  {data.score1}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NonFotografi = ({
  id,
  cabangData,
  showCategory,
  setShowCategory,
  selectedCategory,
  setSelectedCategory,
  schedule,
  setSchedule,
}) => {
  const selectCategoryHandler = (category) => {
    if (selectedCategory !== category) {
      setSelectedCategory(category);
      setSchedule([]);
    }
    setShowCategory(false);
  };

  return (
    <>
      <img
        className="z-0 absolute w-3/4 right-0"
        src={`${assetsCabangDetail}/rumah.png`}
        alt=""
      />
      <div className="flex flex-col justify-center md:px-20 pt-8">
        <div className="flex flex-row items-center justify-between">
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
                  src={`${assetsCabangDetail}/dropdown.svg`}
                  alt=""
                />
              </div>
            </div>
            {showCategory && (
              <div
                className="absolute w-full bg-white rounded-b-3xl mt-3 pb-3"
                style={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}
              >
                {cabangData.length &&
                  cabangData.map((data) => (
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
          <Hasil id={id} />
        </div>
        <div
          className="self-center w-full font-sansPro"
          style={{ minHeight: `${cabangData.length * 70}px` }}
        >
          {schedule.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
    </>
  );
};

const Fotografi = ({ openModal }) => {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="my-20 lg:my-32 mx-auto font-nuku text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">
        Hasil Karya
      </h2>
      <ul className="flex flex-wrap gap-2">
        {dataFotografi.map((data, id) => (
          <li className="flex-grow sm:h-64">
            <button
              className="w-full h-full"
              key={id + 1}
              onClick={() => openModal(id)}
            >
              <img
                loading="lazy"
                className="min-w-full max-h-full object-cover"
                src={`${assetsCabangDetail}/fotografi/${id + 1}.jpg`}
              ></img>
            </button>
          </li>
        ))}
      </ul>
      <button
        className="my-20 mx-auto px-14 py-6 bg-krem rounded-4xl font-nuku text-kuning text-3xl sm:text-7xl"
        style={{
          backgroundImage: `url(${assetsCabang}/background.png)`,
        }}
        onClick={() =>
          window.open("https://bit.ly/PengumpulanKaryaFotografi2021")
        }
      >
        Vote
      </button>
    </div>
  );
};

const CabangDetail = (props) => {
  const id = props.match.params.id;
  const [cabangHeader, setCabangHeader] = useState({});
  const [cabangData, setCabangData] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [modal, setModal] = useState(false);

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
        setCabangData(data);
      }
      setCabangHeader(headerData);
    };
    getData();
  }, [id, selectedCategory]);

  const openModal = (id) => {
    setModal({
      id: id,
      src: `${assetsCabangDetail}/fotografi/${id + 1}.jpg`,
      title: dataFotografi[id].title,
      name: dataFotografi[id].name,
      faculty: dataFotografi[id].faculty,
      description: dataFotografi[id].description,
    });
  };

  return (
    <>
      {modal && (
        <Modal modal={modal} setModal={setModal} openModal={openModal} />
      )}
      <div className="pt-14 lg:pt-0 relative bg-merah min-w-full px-5 overflow-hidden">
        <Header id={id} cabangHeader={cabangHeader} />
        {id !== "Fotografi" && selectedCategory && (
          <NonFotografi
            id={id}
            cabangData={cabangData}
            showCategory={showCategory}
            setShowCategory={setShowCategory}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            schedule={schedule}
            setSchedule={setSchedule}
          />
        )}
        {id === "Fotografi" && <Fotografi openModal={openModal} />}
      </div>
    </>
  );
};

export { CabangDetail };
