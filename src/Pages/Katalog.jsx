import styles from "../Components/Home/Cabor.module.css";
import { useRef } from "react";
import { supporterList } from "../data/dataKatalog";

const Katalog = () => {
  const list = supporterList;
  const content = useRef(null);
  const width = window.innerWidth;

  const assetsCabor = `${process.env.PUBLIC_URL}/images/Cabor`;
  const assetsKatalog = `${process.env.PUBLIC_URL}/images/Katalog`;
  return (
    <>
      <div className="lg:h-screen bg-biru relative">
        <img
          className="lg:-mt-20 pointer-events-none relative"
          src={`${assetsKatalog}/bg.png`}
          alt=""
        />
        {width > 1024 ? (
          <button
            className={`absolute left-1/2 bottom-8 ${styles.arrowBounce}`}
            style={{ maxWidth: "5%" }}
            onClick={() =>
              content.current.scrollIntoView({ behavior: "smooth" })
            }
          >
            <img src={`${assetsCabor}/arrow-bottom.png`} alt="" />
          </button>
        ) : (
          <></>
        )}
      </div>
      <div
        className="bg-biru flex lg:pt-40 flex-col items-center justify-center"
      >
        <img
          className="lg:-mt-8 -mt-10 pointer-events-none relative"
          style={{ width: "50%" }}
          src={`${assetsKatalog}/Lampion.png`}
          alt=""
        />
        
        <div 
        ref={content}
        className="relative px-8 mt-12 grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-y-12">
          {list.map((item) => (
            <a
              className="w-1/2 transform transition-transform transition-300 hover:scale-110"
              key={item.id}
              href={`${process.env.PUBLIC_URL}/katalog/${item.id}`}
            >
              <div className="grid justify-items-center ">
                <img
                  style={{
                    width:"100%",
                  }}
                  className="rounded-full w-pointer-events-none"
                  src={`${assetsKatalog}/supporter/${item.logo}`}
                  alt=""
                />
                <p className="text-white font-sansPro md:text-xl text-center">
                  {item.title}
                </p>
              </div>
            </a>
          ))}
        <img
          className="absolute bottom-0 left-0"
          style={{ width: "4%" }}
          src={`${assetsKatalog}/yellow-rectangle.png`}
          alt=""
        />
        <img
          className="absolute top-0 right-0"
          style={{ width: "4%" }}
          src={`${assetsKatalog}/yellow-rectangle.png`}
          alt=""
        />
        </div>
        
        
      </div>
    </>
  );
};

export { Katalog };
