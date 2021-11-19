import { isMobile } from "react-device-detect";
import { Hasil } from "./Hasil";
import { dataVocalGroup } from "../../data/dataVocalGroup";

const assetsCabangDetail = `${process.env.PUBLIC_URL}/images/CabangDetail`;

const VocalGroup = ({ id, openModal }) => {
  const openVideo = (url, index) => {
    if (isMobile) {
      window.open(url);
    } else {
      openModal(index);
    }
  };
  return (
    <div className="flex flex-col justify-center my-20 lg:my-32">
      <h2 className="mx-auto font-nuku text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">
        Hasil Karya
      </h2>
      <div className="mt-10 mb-20 lg:mb-28">
        <Hasil id={id} />
      </div>
      <ul className="flex flex-wrap justify-center gap-5 lg:gap-10 px-5 lg:px-10 mx-auto">
        {dataVocalGroup.map((data, index) => (
          <li key={data.id}>
            <button
              className="p-4 border border-biru bg-biru rounded-2xl"
              onClick={() => openVideo(data.url, index)}
            >
              <img
                className="rounded-lg"
                src={`${assetsCabangDetail}/vocal-group/${data.id}.jpg`}
                alt=""
              />
              <p className="mt-3 font-bold text-white text-center text-lg">
                {data.faculty}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { VocalGroup };
