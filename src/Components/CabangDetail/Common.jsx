import { useState } from "react";
import { Hasil } from "./Hasil";

const assetsCabangDetail = `${process.env.PUBLIC_URL}/images/CabangDetail`;

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
    <li className="my-7 sm:my-10 lg:my-20">
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
    </li>
  );
};

const Common = ({
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
        <ul
          className="self-center w-full font-sansPro"
          style={{ minHeight: `${cabangData.length * 70}px` }}
        >
          {schedule.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </ul>
      </div>
    </>
  );
};

export { Common };
