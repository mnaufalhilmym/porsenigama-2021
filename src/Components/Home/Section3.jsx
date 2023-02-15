const Section3 = () => {
  return (
    <div className="relative">
      <img
        className="absolute right-0 w-2/5"
        style={{ top: "3.5%" }}
        src={`${process.env.PUBLIC_URL}/images/Sec3/pohon_merah_kanan.png`}
        alt=""
      />
      <img
        className="z-10 relative w-full -mt-1"
        src={`${process.env.PUBLIC_URL}/images/Sec3/kotak_catur.svg`}
        alt=""
      />
      <div className="z-10 relative flex md:flex-row flex-col items-center w-5/6 mx-auto mt-8">
        <div className="w-full md:w-2/3 xl:w-1/2">
          <p className="font-nuku text-left 2xl:text-onefourfour xl:text-oneten lg:text-7xl md:text-5xl text-4xl whitespace-nowrap text-biru capitalize">
            Our Mascot
          </p>
          <div className="flex space-x-3 py-3">
            <img
              className="xl:w-porciTextXl md:w-porciTextMd w-porciText"
              src={`${process.env.PUBLIC_URL}/images/Sec3/porci_teks.svg`}
              alt=""
            />
            <img
              className="xl:w-porciPlayXl md:w-porciPlayMd w-porciPlay"
              src={`${process.env.PUBLIC_URL}/images/Sec3/play.svg`}
              alt=""
            />
          </div>
          <p className="font-sansPro 2xl:text-twoeight xl:text-2xl lg:text-lg md:text-md text-lg text-left text-biru">
            Porchi, Sang Maskot Porsenigama digambarkan oleh sosok burung elang
            yang memiliki ciri fisik gagah dan kuat Porchi juga memiliki sifat
            yang sangat gigih, berani, tidak kenal lelah, dan selalu berpegang
            teguh pada prinsip.
          </p>
        </div>
        <img
          className="z-10 relative md:w-1/3 sm:w-1/2 w-4/5 lg:ml-28"
          src={`${process.env.PUBLIC_URL}/images/Sec3/porci.png`}
          alt=""
        />
      </div>
      <img
        className="relative -mb-1"
        src={`${process.env.PUBLIC_URL}/images/Sec3/bg_end.svg`}
        alt=""
      />
    </div>
  );
};

export { Section3 };
