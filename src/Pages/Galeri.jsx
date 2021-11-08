import { LazyLoadImage } from "react-lazy-load-image-component";
import { datafoto } from "../data/datafoto";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Galeri = () => {
  const[isTampil, setIsTampil] = useState(false)
  const[fotoTampil, setFotoTampil] = useState()

  function closeFoto() {
    setIsTampil(false)
    setFotoTampil()
}

function openFoto(foto) {
    setFotoTampil(foto)
    setIsTampil(true)
    console.log(isTampil, fotoTampil)
}
  return (
    <div className="bg-birdong">
      <div className="relative w-full">
        <img
          className="mt-6 pointer-events-none"
          src={`${process.env.PUBLIC_URL}/images/galeri/atas.png`}
          alt="Galeri"
        />
      </div>
      <div className="flex flex-wrap justify-center md:gap-x-1.5 md:gap-y-0 gap-4 mt-12 -mb-4">
        {datafoto.map((data) => (
          <button className="transition ease-in-out duration-500 filter hover:grayscale transform hover:scale-95"  onClick={()=> openFoto(data)} >
            <LazyLoadImage
              effect="blur"
              className="relative md:w-auto w-72 md:h-72 h-auto w-64 md:rounded rounded-xl"
              src={`${process.env.PUBLIC_URL}/images/galeri/${data.foto}`}
            />
          </button>
        ))}
      </div>
        <Dialog open={isTampil} onClose={closeFoto}>
                      <Dialog.Overlay />
                      <div 
                          className="fixed px-2 py-4 md:top-4 top-32 inset-0 rounded-xl z-20"
                      >
                          <div className="fixed top-0 left-0 bg-gray-900 bg-opacity-70 w-full h-full" onClick={closeFoto} />
                          <div className="relative md:w-1/2 w-9/10 h-full md:mt-14 mt-4 m-auto">
                              {fotoTampil &&
                                  <div className={`m-auto p-1 m-auto relative rounded-xl shadow green-900`}>
                                      <button 
                                          className="md:text-4xl text-6xl text-white bg-merah absolute md:-top-8 -top-8 md:-right-4 -right-2 px-2 rounded-full overflow-hidden z-40"
                                          onClick={closeFoto}
                                          >
                                          <FontAwesomeIcon icon={faTimes}/>
                                      </button>
                                      <img className="rounded-xl mx-auto w-full h-120" src={`${process.env.PUBLIC_URL}/images/galeri/${fotoTampil.foto}`} alt="Galeri" />
                                  </div>
                              }                                
                          </div>
                      </div>
                  </Dialog>
    </div>
  );
};

export { Galeri };
