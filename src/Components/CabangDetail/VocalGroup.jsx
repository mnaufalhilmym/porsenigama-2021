import { isMobile } from "react-device-detect";
import { Hasil } from "./Hasil";
import { dataVocalGroup } from "../../data/dataVocalGroup";

const assetsCabangDetail = `${process.env.PUBLIC_URL}/images/CabangDetail`;
const assetsCabang = `${process.env.PUBLIC_URL}/images/Cabang`;

const VocalGroup = ({ id, openModal }) => {
  const openVideo = (url, index) => {
    if (isMobile) {
      window.open(url);
    } else {
      openModal(index);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <h2 className="mt-20 lg:mt-32 mx-auto font-nuku text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">
        Hasil Karya
      </h2>
      <div className="mt-10 mb-20 lg:mb-32">
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
      <button
        className="my-20 lg:my-32 mx-auto px-14 py-6 bg-krem rounded-4xl font-nuku text-kuning text-3xl sm:text-7xl transform transition-transform transition-300 hover:scale-110"
        style={{
          backgroundImage: `url(${assetsCabang}/background.png)`,
        }}
        onClick={() => window.open("https://forms.gle/YaTQMzSqrq7JhARaA")}
      >
        Vote
      </button>
    </div>
  );
};

export { VocalGroup };
