import { dataFotografi } from "../../data/dataFotografi";

const assetsCabangDetail = `${process.env.PUBLIC_URL}/images/CabangDetail`;
const assetsCabang = `${process.env.PUBLIC_URL}/images/Cabang`;

const Fotografi = ({ openModal }) => {
  return (
    <div className="flex flex-col justify-center">
      <h2 className="my-20 lg:my-32 mx-auto font-nuku text-center text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">
        Hasil Karya
      </h2>
      <ul className="flex flex-wrap gap-2">
        {dataFotografi.map((_, id) => (
          <li key={id + 1} className="flex-grow sm:h-64">
            <button className="w-full h-full" onClick={() => openModal(id)}>
              <img
                loading="lazy"
                className="min-w-full max-h-full object-cover"
                src={`${assetsCabangDetail}/fotografi/${id + 1}.jpg`}
                alt=""
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

export { Fotografi };
