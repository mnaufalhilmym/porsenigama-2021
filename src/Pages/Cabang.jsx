import { useState, useRef } from "react";
import styles from "../Components/Home/Cabang.module.css";

import { caborList, casenList } from "../data/dataCabang";

const Cabang = () => {
  const [list, setList] = useState(caborList);
  const content = useRef(null);
  const width = window.innerWidth;

  const assetsCabang = `${process.env.PUBLIC_URL}/images/Cabang`;

  return (
    <>
      <div className="relative w-full">
        <div
          className="w-full"
          style={{
            backgroundImage: `url(${assetsCabang}/hero.png)`,
            backgroundSize: "cover",
            height: width > 1024 ? "100vh" : `${(width * 1042) / 1920}px`,
          }}
        ></div>
        {width > 1024 ? (
          <button
            className={`absolute left-1/2 bottom-20 ${styles.arrowBounce}`}
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
      <div
        className="flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${assetsCabang}/background.png)`,
        }}
      >
        <img
          ref={content}
          className="mt-8 lg:mt-14 pointer-events-none"
          style={{ width: "12.5%" }}
          src={`${assetsCabang}/divider.svg`}
          alt=""
        />
        <div className="flex justify-center w-3/4 my-8 lg:my-14 space-x-8 lg:space-x-24">
          <button
            className="transform transition-transform transition-300 hover:scale-110"
            onClick={() => setList(caborList)}
          >
            <img
              className="pointer-events-none transform transition-transform transition-300 hover:scale-110"
              src={`${assetsCabang}/button-olahraga.svg`}
              alt=""
            />
          </button>
          <button
            className="transform transition-transform transition-300 hover:scale-110"
            onClick={() => setList(casenList)}
          >
            <img
              className="pointer-events-none"
              src={`${assetsCabang}/button-seni.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-wrap justify-center w-5/6 gap-y-10">
          {list.map((item) => (
            <a
              className="w-1/3 transform transition-transform transition-300 hover:scale-110"
              key={item.title}
              href={`${process.env.PUBLIC_URL}/cabang/${item.title}`}
            >
              <div className="flex flex-col items-center">
                <img
                  className="pointer-events-none"
                  src={`${assetsCabang}/gambar-${item.title}.png`}
                  alt=""
                />
                <p className="font-sansPro md:text-xl text-center">
                  {item.title}
                </p>
              </div>
            </a>
          ))}
        </div>
        <img
          className="my-8 lg:my-14 pointer-events-none"
          style={{ width: "12.5%" }}
          src={`${assetsCabang}/divider.svg`}
          alt=""
        />
        <div className="z-30 relative w-full">
          <img
            className="z-40 absolute pointer-events-none"
            style={{ left: "5%", width: "15%" }}
            src={`${assetsCabang}/footer-maskot.png`}
            alt=""
          />
          <img
            className="absolute pointer-events-none"
            style={{ width: "43%" }}
            src={`${assetsCabang}/footer-pohon.png`}
            alt=""
          />
          <img
            className="relative ml-auto pointer-events-none"
            style={{ width: "48%" }}
            src={`${assetsCabang}/footer-gsp.png`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export { Cabang };
