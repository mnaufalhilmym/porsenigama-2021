import { useState, useEffect, useRef } from "react";
import { db } from "../data/db";
import styles from "../Components/Home/Cabang.module.css";

const assetsKatalog = `${process.env.PUBLIC_URL}/images/Katalog`;
const assetsCabang = `${process.env.PUBLIC_URL}/images/Cabang`;

const KatalogDetail = (props) => {
  const id = props.match.params.id;

  const [toggleState, setToggleState] = useState(0);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [Katalog, setKatalog] = useState({});
  useEffect(() => {
    const getData = async () => {
      const headerData = (
        await db.collection("dataKatalog").doc(id).get()
      ).data();
      setKatalog(headerData);
      setstate(headerData);
    };
    getData();
  }, []);

  const content = useRef(null);

  const active =
    "rounded-xl sm:text-xs md:text-2xl lg:text-3xl p-4 bg-white font-bold text-merah ";
  const inactive =
    "rounded-xl sm:text-xs md:text2xl lg:text-3xl p-4 bg-merah font-bold text-white";
  const setstate = (props) => {
    props.article === ""
      ? props.video === ""
        ? props.chant === ""
          ? props.infografis === ""
            ? setToggleState(0)
            : setToggleState(4)
          : setToggleState(3)
        : setToggleState(2)
      : setToggleState(1);
  };

  return (
    <>
      <div className="bg-biru">
        {/* Start of Header */}
        <div className="lg:mb-72 lg:h-screen relative">
          <img
            className="lg:-mt-20 pointer-events-none"
            src={`${assetsKatalog}/bg.png`}
            alt=""
          />
          {window.innerWidth > 1024 ? (
            <button
              className={`absolute left-1/2 bottom-8 ${styles.arrowBounce}`}
              style={{ maxWidth: "5%" }}
              onClick={() =>
                content.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              <img src={`${assetsCabang}/arrow-bottom.png`} alt="" />
            </button>
          ) : (
            <></>
          )}
        </div>
        {/* End of Header */}

        {/* Logo  */}
        <div
          className="relative flex flex-col items-center justify-center"
          ref={content}
        >
          <img
            className=" pointer-events-none relative w-60"
            src={`${assetsKatalog}/supporter/${Katalog.logo}`}
            alt=""
          />
          <p className="text-center md:my-4 font-sansPro text-white font-bold text-md md:text-5xl">
            {" "}
            {Katalog.title}{" "}
          </p>
          <div>
            <img
              src={`${assetsKatalog}/yellow-rectangle.png`}
              alt="ornament kanan"
              className="hidden md:block absolute top-40 right-0"
              style={{ width: "2%" }}
            />
          </div>
        </div>
        {/* End of logo  */}

        {/* Button */}
        <div className=" grid grid-cols-1 mx-4 md:mx-20 text-center ">
          <div
            className={
              Katalog.article === ""
                ? "hidden"
                : toggleState === 1
                ? active
                : inactive
            }
            onClick={() => toggleTab(1)}
          >
            Artikel
          </div>
          <div
            className={
              toggleState === 1
                ? "mt-8 text-white text-sm md:text-2xl font-bold  "
                : "hidden"
            }
          >
            {Katalog.article}
          </div>
        </div>
        <div className="cursor-pointer mt-8  grid grid-cols-2 md:grid-cols-3 mx-4 md:mx-20 gap-x-4 md:gap-x-12 gap-y-4 text-center ">
          <div
            className={
              Katalog.video === ""
                ? "hidden"
                : toggleState === 2
                ? active
                : inactive
            }
            onClick={() => toggleTab(2)}
          >
            Video Profil
          </div>
          <div
            className={
              Katalog.chant === ""
                ? "hidden"
                : toggleState === 3
                ? active
                : inactive
            }
            onClick={() => toggleTab(3)}
          >
            Chant
          </div>
          <div
            className={
              Katalog.infografis === ""
                ? "hidden"
                : toggleState === 4
                ? active
                : inactive
            }
            onClick={() => toggleTab(4)}
          >
            Infografis
          </div>
        </div>
        {/*End of button */}

        {/* Start of content  */}

        <div className="relative grid grid-cols-1 text-justify justify-items-center  mt-5 lg:mt-10 mx-10 lg:mx-20 pb-10">
          <div className={toggleState === 2 ? "w-11/12 md:w-1/2" : "hidden"}>
            <video
              controls
              src={`${assetsKatalog}/video/${Katalog.video}`}
            ></video>
            <a
              className="pt-16 underline lg:text-2xl text-sm  text-white font-bold"
              href={Katalog.ytvideo}
              target="_blank"
            >
              Tonton Selengkapnya
            </a>
          </div>

          <div className={toggleState === 3 ? "w-11/12 md:w-1/2" : "hidden"}>
            <video
              controls
              src={`${assetsKatalog}/chant/${Katalog.chant}`}
            ></video>
            <a
              className="pt-16 underline lg:text-2xl text-sm  text-white font-bold"
              href={Katalog.ytchant}
              target="_blank"
            >
              Tonton Selengkapnya
            </a>
          </div>

          <div className={toggleState === 4 ? "w-11/12 md:w-1/2 " : "hidden"}>
            <img
              className=" "
              src={`${assetsKatalog}/infografis/${Katalog.infografis}`}
              alt="Infografis"
            />
          </div>
        </div>
        {/* End of Content  */}
        <div className="relative">
          <img
            src={`${assetsKatalog}/yellow-rectangle.png`}
            alt="ornament kanan"
            className="hidden md:block absolute bottom-0 left-0"
            style={{ width: "2%" }}
          />
        </div>
      </div>
    </>
  );
};

export { KatalogDetail };
