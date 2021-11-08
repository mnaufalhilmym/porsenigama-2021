import React, { useState, useEffect } from 'react'
import './Carousel1.css'
import { useHistory } from 'react-router-dom';
import { db } from "../../data/db";


const Carousel1 = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentContent, setCurrentContent] = useState();
  const [currentTitle, setCurrentTitle] = useState();
  const [currentLink, setCurrentLink] = useState();
  const [load, setLoad] = useState('0');

  const [dataBerita, setDataBerita] = useState([])
  const [title, setTitle] = useState([])
  const [images, setImages] = useState([])
  const [content, setContent] = useState([])
  const [link, setLink] = useState([])
  
  useEffect(() => {
    const articlesData = db.collection("berita").orderBy("link").onSnapshot((snap) => {
      let data = snap.docs.map((doc) => doc.data());
      setDataBerita(data);
      setLoad('1');
      return articlesData();     
    });
  }, []);

  useEffect(() => {
    const titledata = dataBerita.map(x=>x.title)
    const previewdata = dataBerita.map(x=>x.preview)
    const linkdata = dataBerita.map(x=>x.link)
    const imagedata = dataBerita.map(x=>x.images)
    setImages(imagedata)
    setLink(linkdata)
    setCurrentLink(linkdata[0])
    setTitle(titledata)
    setCurrentTitle(titledata[0])
    setContent(previewdata)
    setCurrentContent(previewdata[0])
    return titledata, previewdata, imagedata
  }, [dataBerita])

  const refs = images.reduce((acc, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = i => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: 'smooth',
      //      Defines vertical alignment.
      block: 'nearest',
      //      Defines horizontal alignment.
      inline: 'start',
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = images.length;
  const num = currentImage;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    document.getElementById('textBerita').classList.toggle('fade');
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
      setCurrentTitle(title[0]);
      setCurrentContent(content[0]);
      setCurrentLink(link[0]);
    } else {
      scrollToImage(currentImage + 1);
      setCurrentTitle(title[num + 1]);
      setCurrentContent(content[num + 1]);
      setCurrentLink(link[num + 1]);
    }
    setTimeout(() => { document.getElementById('textBerita').classList.toggle('fade'); }, 500);
  };

  const previousImage = () => {
    document.getElementById('textBerita').classList.toggle('fade');
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
      setCurrentTitle(title[totalImages - 1]);
      setCurrentContent(content[totalImages - 1]);
      setCurrentLink(link[totalImages - 1]);
    } else {
      scrollToImage(currentImage - 1);
      setCurrentTitle(title[num - 1]);
      setCurrentContent(content[num - 1]);
      setCurrentLink(link[num - 1]);
    }
    setTimeout(() => { document.getElementById('textBerita').classList.toggle('fade'); }, 500);
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle = 'absolute mt-0 md:mt-7 z-10 h-10 w-10 flex items-center justify-center transform scale-35 md:scale-75 transition duration-300 md:hover:scale-100';

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = isLeft => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? '-left-10 md:-left-20' : '-right-10 md:-right-20'}`}
      style={{ top: '40%' }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? 'left' : 'right'}`}>
        <img src={`${isLeft ? `${process.env.PUBLIC_URL}/images/Sec1/Kiri.svg` : `${process.env.PUBLIC_URL}/images/Sec1/Kanan.svg`}`} alt={`${isLeft ? 'Berita Kiri' : 'Berita Kanan'}`} /> 
      </span>
    </button>
  );
  
  const history = useHistory();

  const readMore = () => {
    history.push(`${process.env.PUBLIC_URL}/berita`, { newsNo : currentLink });
  };

  useEffect(() => {
    console.log(load)
  }, [load])

  return (
  // Images are placed using inline flex. We then wrap an image in a div
  // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
  // Finally the image itself will be 100% of a parent div. Outer div is
  // set with position relative, so we can place our cotrol buttons using
  // absolute positioning on each side of the image.
    <div className="p-0 mt-8 md:p-12 flex justify-center w-3/4 md:w-3/4 items-center">
      <div className="relative w-full">
        <div className="carousel shadow-csel1">
        {(() => {
            if (load === '0') {
              return (
                <div className = 'h-1/4x'></div>
              )
            } else {
              return (
                <>
                {sliderControl(true)}
                {dataBerita.map((berita, i) => (
                  <>
                  <div className="w-full flex-shrink-0" key={berita.link} ref={refs[i]}>
                    <img src={berita.images} className="w-full object-contain" alt="" />
                  </div>
                  </>        
                ))}
                <div className='w-full h-full flex justify-end absolute items-center'>
                    <div id='textBerita' className='w-1/3 text-white text-right mr-3 md:mr-8 cursor-default flex-shrink-0'>
                      <div className='w-full font-sans font-bold text-md md:text-4xl md:mt-12 object-contain'>
                        {currentTitle}
                      </div>
                      <div className='w-full font-sansPro hidden md:flex md:text-md mt-2 object-contain'>
                        {currentContent}
                      </div>
                      <button className='text-yellow-500 cursor-pointer font-sansPro text-sm md:text-md'
                        onClick={readMore}
                      >
                        READ MORE...
                      </button>
                    </div>
                  </div>
                {sliderControl()}
                </>
              )
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default Carousel1