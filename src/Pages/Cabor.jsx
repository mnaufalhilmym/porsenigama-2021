import { useState, useRef } from "react";
import styles from "../Components/Home/Cabor.module.css";

import { caborList, casenList } from "../data/dataCabor";

const Cabor = () => {
  const [list, setList] = useState(caborList);
  const content = useRef(null);
  const width = window.innerWidth;

  const assetsCabor = `${process.env.PUBLIC_URL}/images/Cabor`;

  return (
    <>
      <div className="relative w-full">
        <img
          className="pointer-events-none"
          src={`${assetsCabor}/hero.png`}
          alt=""
        />
        {width > 1020 ? (
          <button
            className={`absolute left-1/2 bottom-24`}
            style={{ width: "5%" }}
            onClick={() =>
              content.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            <img
              className={styles.arrowBounce}
              src={`${assetsCabor}/arrow-bottom.png`}
              alt=""
            />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div
        className="flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url(${assetsCabor}/background.png)`,
        }}
      >
        <img
          ref={content}
          className="mt-8 lg:mt-14 pointer-events-none"
          style={{ width: "12.5%" }}
          src={`${assetsCabor}/divider.svg`}
          alt=""
        />
        <div className="flex justify-center w-2/3 my-8 lg:my-14 space-x-3 lg:space-x-24">
          <button onClick={() => setList(caborList)}>
            <img
              className="pointer-events-none"
              src={`${assetsCabor}/button-olahraga.svg`}
              alt=""
            />
          </button>
          <button onClick={() => setList(casenList)}>
            <img
              className="pointer-events-none"
              src={`${assetsCabor}/button-seni.svg`}
              alt=""
            />
          </button>
        </div>
        <div className="flex flex-wrap justify-center w-5/6 gap-y-10">
          {list.map((item) => (
            <a className="w-1/3" key={item} href={item}>
              <div className="flex flex-col items-center">
                <img
                  className="pointer-events-none"
                  src={`${assetsCabor}/gambar-${item}.png`}
                  alt=""
                />
                <p className="font-sansPro md:text-xl text-center">{item}</p>
              </div>
            </a>
          ))}
        </div>
        <img
          className="my-8 lg:my-14 pointer-events-none"
          style={{ width: "12.5%" }}
          src={`${assetsCabor}/divider.svg`}
          alt=""
        />
        <div className="z-30 relative w-full">
          <img
            className="z-40 absolute pointer-events-none"
            style={{ left: "5%", width: "15%" }}
            src={`${assetsCabor}/footer-maskot.png`}
            alt=""
          />
          <img
            className="absolute pointer-events-none"
            style={{ width: "43%" }}
            src={`${assetsCabor}/footer-pohon.png`}
            alt=""
          />
          <img
            className="relative ml-auto pointer-events-none"
            style={{ width: "48%" }}
            src={`${assetsCabor}/footer-gsp.png`}
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export { Cabor };
