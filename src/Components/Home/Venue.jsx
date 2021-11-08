import React, {useState} from 'react'
import './Venue.css'

// Ini fungsi tombol slidernya 
function BtnSlider({ direction, moveSlide }) {
    // console.log(direction, moveSlide);
    const btn = "" ;
    return (
      <button
        onClick={moveSlide}
        className = {direction === "next" ? `${btn} btn-slide next` : `${btn} btn-slide prev`}
      >
        <img
          src={direction === "next" ? `${process.env.PUBLIC_URL}/images/Sec5/right-circle.png` : `${process.env.PUBLIC_URL}/images/Sec5/left-circle.png` }
          className =  "slide-img transform -translate-y-1/2 transition duration-300 md:hover:scale-110"
          alt =""
        ></img>
        {/* <img
          src= {`${process.env.PUBLIC_URL}/images/Sec5/button-slide.png`}
          className = "slide-img flex md:hidden"
          alt =""
        ></img> */}
      </button>
    );
}


//Kalau mau edit jumlah gambar, tinggal ubah array dataslidernya
const dataSlider = [
  {
    title: "lorem",
  },
  {
    title: "lorem",
  },
  {
    title: "lorem",
  },
  {
    title: "lorem",
  },
  {
    title: "lorem",
  },
  {
    title: "lorem",
  },
  {
    title: "lorem",
  },
];


export function Venue() {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }


    return (
        <div className="relative h-96 md:h-screen">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                    key={obj.id}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >   
                        <img
                        alt =""
                        src={process.env.PUBLIC_URL + `/images/Sec5/Imgs/img${index + 1}.jpg`} 
                        />
                    </div>
                )
            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

        </div>
    )
}

export default Venue;




