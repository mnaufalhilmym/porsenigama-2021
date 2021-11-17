import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { dataFotografi } from "../../data/dataFotografi";
import { dataVocalGroup } from "../../data/dataVocalGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const assetsArrow = `${process.env.PUBLIC_URL}/images/Sec1`;
const assetsCabang = `${process.env.PUBLIC_URL}/images/Cabang`;

const Modal = ({ modal, setModal, openModal }) => {
  const [play, setPlay] = useState(true);
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.focus();
  }, [modalRef]);

  document.body.classList.add("overflow-hidden");

  const dataArray = () => {
    switch (modal.type) {
      case "Fotografi":
        return dataFotografi;
      case "Vocal Group":
        return dataVocalGroup;
    }
  };

  const changeMedia = (id) => {
    if (id === dataArray().length) {
      id = 0;
    } else if (id < 0) {
      id = dataArray().length - 1;
    }
    openModal(id);
  };

  const btnClickHandler = (e, id) => {
    e.stopPropagation();
    changeMedia(id);
  };

  const keyDownHandler = (e) => {
    switch (e.code) {
      case "ArrowRight":
        changeMedia(modal.index + 1);
        break;
      case "ArrowLeft":
        changeMedia(modal.index - 1);
        break;
      case "Escape":
        closeModal();
        break;
      case "Space":
        setPlay((state) => !state);
        break;
    }
  };

  const closeModal = () => {
    document.body.classList.remove("overflow-hidden");
    setModal(false);
  };

  const Button = ({ arrow }) => {
    return (
      <button
        className="hidden md:block flex-shrink-0 w-8"
        onClick={(e) =>
          btnClickHandler(
            e,
            arrow === "left" ? modal.index - 1 : modal.index + 1
          )
        }
      >
        <img
          src={`${assetsArrow}/${arrow === "left" ? "Kiri" : "Kanan"}.svg`}
          alt=""
        />
      </button>
    );
  };

  return (
    <div
      className="fixed flex items-center justify-center w-full h-full pt-11 px-8 bg-gray-900 bg-opacity-70 transition-opacity"
      style={{ zIndex: "200" }}
      onClick={closeModal}
    >
      <div className="flex gap-4 lg:w-3/4 h-5/6">
        <Button arrow="left" />
        <div className="flex flex-col flex-shrink w-full h-full">
          <button className="self-end absolute transform -translate-y-full translate-x-2/3 sm:text-2xl md:text-4xl text-white bg-kuning px-2 rounded-full  z-50">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <div
            className="h-full px-4 py-4 lg:p-10 bg-white rounded-4xl outline-none"
            style={{
              backgroundImage: `url(${assetsCabang}/background.png)`,
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => keyDownHandler(e)}
            tabIndex="0"
            ref={modalRef}
          >
            {modal.type === "Fotografi" && (
              <div className="h-full flex flex-col items-center px-3 lg:px-3 overflow-y-auto">
                <>
                  <img
                    className="w-full h-full md:w-4/5 lg:h-4/5 object-contain"
                    src={modal.src}
                    alt=""
                  />
                  <div className="flex flex-col items-center">
                    {modal.title && (
                      <p className="mt-8 font-bold text-center text-2xl">
                        {modal.title}
                      </p>
                    )}
                    <div className="my-6 text-center">
                      <p className="font-bold text-xl">{modal.name}</p>
                      <p>{modal.faculty}</p>
                    </div>
                    <p className="text-justify whitespace-pre-line">
                      {modal.description}
                    </p>
                  </div>
                </>
              </div>
            )}
            {modal.type === "Vocal Group" && (
              <div className="flex w-full h-full flex-col items-center">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    url={modal.vidSrc}
                    playing={play}
                  />
                </div>
                <p className="hidden lg:block mt-4 font-bold text-center text-xl">
                  {modal.faculty}
                </p>
              </div>
            )}
          </div>
        </div>
        <Button arrow="right" />
      </div>
    </div>
  );
};

export { Modal };
