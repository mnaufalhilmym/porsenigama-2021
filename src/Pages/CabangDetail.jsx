import { useState, useEffect } from "react";
import { db } from "../data/db";
import { dataFotografi } from "../data/dataFotografi";
import { dataVocalGroup } from "../data/dataVocalGroup";
import { Hasil } from "../Components/CabangDetail/Hasil";
import {
  Common,
  Fotografi,
  Modal,
  VocalGroup,
} from "../Components/CabangDetail";

const assetsCabangDetail = `${process.env.PUBLIC_URL}/images/CabangDetail`;

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

  const openModal = (index) => {
    switch (id) {
      case "Fotografi":
        setModal({
          type: id,
          index: index,
          src: `${assetsCabangDetail}/fotografi/${index + 1}.jpg`,
          title: dataFotografi[index].title,
          name: dataFotografi[index].name,
          faculty: dataFotografi[index].faculty,
          description: dataFotografi[index].description,
        });
        break;
      case "Vocal Group":
        setModal({
          type: id,
          index: index,
          imgSrc: `${assetsCabangDetail}/vocal-group/${index}.jpg`,
          faculty: dataVocalGroup[index].faculty,
          vidSrc: dataVocalGroup[index].url,
        });
        break;
      default:
        return;
    }
  };

  return (
    <>
      {modal && (
        <Modal modal={modal} setModal={setModal} openModal={openModal} />
      )}
      <div className="pt-14 lg:pt-0 relative bg-merah min-w-full px-5 overflow-hidden">
        <Header id={id} cabangHeader={cabangHeader} />
        {id !== "Fotografi" && id !== "Vocal Group" && (
          <>
            {!selectedCategory && (
              <div className="mb-20">
                <Hasil id={id} />
              </div>
            )}
            {selectedCategory && (
              <Common
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
          </>
        )}
        {id === "Fotografi" && <Fotografi id={id} openModal={openModal} />}
        {id === "Vocal Group" && <VocalGroup id={id} openModal={openModal} />}
      </div>
    </>
  );
};

export { CabangDetail };
