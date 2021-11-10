import "./Navbar.css";
import { useEffect, useState } from "react";
import useScrollListener from "./hooks/useScrollListener.jsx";

const Navbar = () => {
  const [navClassList, setNavClassList] = useState([]);
  const [navYellow, setNavYellow] = useState(false);
  const scroll = useScrollListener();

  useEffect(() => {
    setNavYellow(window.location.pathname.includes("/cabang/") ? true : false);
  }, []);

  // update classList of nav on scroll
  useEffect(() => {
    const _classList = [];

    if (scroll.y > 150 && scroll.y - scroll.lastY > 0)
      _classList.push("nav-bar--hidden");

    setNavClassList(_classList);
  }, [scroll.y, scroll.lastY]);

  return (
    <nav
      className={
        navClassList.join(" ") +
        " navbar fixed z-100 w-full flex justify-between font-sans text-white" +
        (navYellow ? " bg-kuning" : " bg-merah")
      }
    >
      <div className="flex items-center ml-2 md:ml-8">
        <a href={`${process.env.PUBLIC_URL}/`}>
          <img
            src={`${process.env.PUBLIC_URL}/images/Title/logo porseni traced.svg`}
            alt="Logo Porsenigama"
            className="transform md:scale-110"
          />
        </a>
      </div>
      <div>
        <div className="flex justify-center gap-x-2 md:gap-x-12 py-3 text-sm md:text-base lg:text-lg mr-2 md:mr-8">
          <div>
            <a href={`${process.env.PUBLIC_URL}/`}>Beranda</a>
          </div>
          <div>
            <a href={`${process.env.PUBLIC_URL}/cabang`}>Cabang</a>
          </div>
          <div>
            <a href={`${process.env.PUBLIC_URL}/klasemen`}>Klasemen</a>
          </div>
          <div>
            <a href={`${process.env.PUBLIC_URL}/galeri`}>Galeri</a>
          </div>
          <div>
            <a href={`${process.env.PUBLIC_URL}/faq`}>FAQ</a>
          </div>
          <div>
            <a href={`${process.env.PUBLIC_URL}/katalog`}>Katalog</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
