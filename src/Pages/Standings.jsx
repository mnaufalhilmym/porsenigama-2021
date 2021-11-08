import { db } from "../data/db";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Hasil } from '../Components/CaborDetail'

const Standings = () => {
  const [standingsData, setStandingsData] = useState([]);
  const [filter, setFilter] = useState('0');

  const filterlib = ["badminton", "badminton", "sepak", "panahan", "esport", "judo", "karate",
                      "taekwondo", "silat", "catur", "panjat", "bridge", "puisi", "monolog",
                      "band", "lukis", "makeup", "keroncong", "vocal", "naskah", "foto",
                      "tari"];

  const filtercabdetaillib = ["Badminton", "Badminton", "Sepak Bola", "Panahan", "E-Sport", "Judo", "Karate",
                      "Taekwondo", "Silat", "Catur", "Panjat Tebing", "Bridge", "Menulis Puisi", "Monolog",
                      "Band", "Melukis", "Make up Creation", "Keroncong", "Vocal Group", "Naskah Lakon", "Fotografi",
                      "Seni Tari"];

  const history = useHistory();

  useEffect(() => {
    if (filter === '0') {
      const medalsData = db.collection("standings").orderBy("name").onSnapshot((snap) => {
        let data = snap.docs.map((doc) => doc.data());
        data = data.sort((a, b) => {
          if (a.gold < b.gold) {
            return 1;
          } else if (a.gold > b.gold) {
            return -1;
          } else {
            if (a.silver < b.silver) {
              return 1;
            } else if (a.silver > b.silver) {
              return -1;
            } else {
              if (a.bronze < b.bronze) {
                return 1;
              } else if (a.bronze > b.bronze) {
                return -1;
              } else {
                return 0;
              }
            }
          }
        });
        setStandingsData(data);
        return medalsData();
      });
    } else {
      const medalsData = db.collection("standings").where(filterlib[Number(filter)], "!=", null).onSnapshot((snap) => {
        let data = snap.docs.map((doc) => doc.data());
        data = data.sort((a, b) => {
          if (a[filterlib[Number(filter)]].gold !== null && b[filterlib[Number(filter)]].gold !== null) {
            if (a[filterlib[Number(filter)]].gold < b[filterlib[Number(filter)]].gold) {
              return 1;
            } else if (a[filterlib[Number(filter)]].gold > b[filterlib[Number(filter)]].gold) {
              return -1;
            } else {
              if (a[filterlib[Number(filter)]].silver < b[filterlib[Number(filter)]].silver) {
                return 1;
              } else if (a[filterlib[Number(filter)]].silver > b[filterlib[Number(filter)]].silver) {
                return -1;
              } else {
                if (a[filterlib[Number(filter)]].bronze < b[filterlib[Number(filter)]].bronze) {
                  return 1;
                } else if (a[filterlib[Number(filter)]].bronze > b[filterlib[Number(filter)]].bronze) {
                  return -1;
                } else {
                  return 0;
                }
              }
            }
          }
        });
        setStandingsData(data);
        return medalsData();
      });
    }
  }, [filter]);
  
  const goBack = () => {
    history.push(`${process.env.PUBLIC_URL}/`);
  };

  const optionClick = () => {
    setFilter(document.getElementById("filterli").value);
  };

  return (
    <div className="min-h-screen font-nuku tracking-wide bg-krem relative overflow-hidden">
      <img
        src={`${process.env.PUBLIC_URL}/images/Standings/Bg.png`}
        alt=""
        className="absolute"
      />
      <div className="h-4 md:hidden"></div>
      <div
        className="hidden md:flex"
        style={{
          height: "50vh",
        }}
      ></div>
      <h1
        className="font-bold pt-24 text-center text-5xl md:text-fourteenvh tracking-wider relative text-biru"
        style={{
          textShadow: [
            "-1px -1px 0 #FBE5D2",
            "-0.5px -1px 0 #FBE5D2",
            "0px -1px 0 #FBE5D2",
            "0.5px -1px 0 #FBE5D2",
            "1px -1px 0 #FBE5D2",
            "1.5px -0.5px 0 #FBE5D2",
            "2px 0px 0 #FBE5D2",
            "2.5px 0.5px 0 #FBE5D2",
            "3px 1px 0 #FBE5D2",
            "3.5px 1.5px 0 #FBE5D2",
            "4px 2px 0 #FBE5D2",
            "4.5px 3.5px 0 #FBE5D2",
            "5px 3px 0 #FBE5D2",
            "-1px 0px 0 #FBE5D2",
            "-1px 1px 0 #FBE5D2",
            "-0.5px 1.5px 0 #FBE5D2",
            "0px 2px 0 #FBE5D2",
            "0.5px 2.5px 0 #FBE5D2",
            "1px 1px 0 #FBE5D2",
            "1.5px 1.5px 0 #FBE5D2",
            "2px 2px 0 #FBE5D2",
            "2.5px 2.5px 0 #FBE5D2",
            "3px 3px 0 #FBE5D2",
            "3.5px 3.5px 0 #FBE5D2",
            "4px 4px 0 #FBE5D2",
            "4.5px 4.5px 0 #FBE5D2",
            "5px 5px 0 #FBE5D2",
            "1px 3px 0 #FBE5D2",
            "1.5px 3.5px 0 #FBE5D2",
            "2px 4px 0 #FBE5D2",
            "2.5px 4.5px 0 #FBE5D2",
            "3px 5px 0 #FBE5D2",
          ],
        }}
      >
        Klasemen
      </h1>
      <div className="h-4 md:hidden"></div>
      <div
        className="hidden md:flex"
        style={{
          height: "50vh",
        }}
      ></div>
      {/* <Hasil filter={filter}/> */}
      <div className = 'flex justify-end mx-12'>
        <select id="filterli" className="dropdown relative font-sansPro font-semibold text-xs md:text-threevh" onClick={optionClick}>
          <option value="0" selected="selected">Keseluruhan</option>
          <option value="1">Badminton</option>
          <option value="2">Sepak Bola</option>
          <option value="3">Panahan</option>
          <option value="4">E-Sports</option>
          <option value="5">Judo</option>
          <option value="6">Karate</option>
          <option value="7">Taekwondo</option>
          <option value="8">Silat</option>
          <option value="9">Catur</option>
          <option value="10">Panjat Tebing</option>
          <option value="11">Bridge</option>
          <option value="12">Puisi</option>
          <option value="13">Monolog</option>
          <option value="14">Band</option>
          <option value="15">Melukis</option>
          <option value="16">Kreasi Makeup</option>
          <option value="17">Keroncong</option>
          <option value="18">Vocal Group</option>
          <option value="19">Naskah Lakon</option>
          <option value="20">Fotografi</option>
          <option value="21">Seni Tari</option>
        </select>
      </div>
      <div className="w-full flex justify-center my-12 text-center relative">
        <table className="text-xs md:text-fivevh mx-12 md:table-fixed md:w-full">
          <thead>
            <tr>
              <th
                className="px-6 border-3 border-ungugaje md:w-3/5"
                style={{ "borderTop": "none", "borderLeft": "none" }}
              ></th>
              <th
                className="px-6 border-3 border-ungugaje"
                align="center"
                style={{ "borderTop": "none" }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/Standings/Mendali gold.png`}
                  alt="Tabel perolehan medali emas"
                  className="transform scale-150 md:scale-100 md:w-1/2 md:h-1/2"
                />
              </th>
              <th
                className="px-6 border-3 border-ungugaje"
                align="center"
                style={{ "borderTop": "none" }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/Standings/Mendali silver.png`}
                  alt="Tabel perolehan medali emas"
                  className="transform scale-150 md:scale-100 md:w-1/2 md:h-1/2"
                />
              </th>
              <th
                className="px-6 border-3 border-ungugaje"
                align="center"
                style={{ "borderTop": "none" }}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/images/Standings/Mendali bronze.png`}
                  alt="Tabel perolehan medali emas"
                  className="transform scale-150 md:scale-100 md:w-1/2 md:h-1/2"
                />
              </th>
              <th
                className="px-6 border-3 border-ungugaje"
                style={{ "borderTop": "none" }}
              >
                total
              </th>
            </tr>
          </thead>
          {(() => {
            if (filter === '0') {
              return (
                <tbody>
                  {standingsData.map((faculty, index) => (
                    <tr key={faculty.name}>
                      <td
                        className="px-6 border-3 text-left border-ungugaje font-sansPro font-bold"
                        style={{ "borderLeft": "none", "borderBottom": "none" }}
                      >
                        {faculty.name}
                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {faculty.gold}
                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {faculty.silver}
                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {faculty.bronze}
                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >{`${faculty.silver + faculty.gold + faculty.bronze}`}</td>
                    </tr>
                  ))}
                </tbody>
              )
            } else {
              return (
                <tbody>
                  {standingsData.map((faculty, index) => (
                    <tr key={faculty.name}>
                      <td
                        className="px-6 border-3 text-left border-ungugaje font-sansPro font-bold"
                        style={{ "borderLeft": "none", "borderBottom": "none" }}
                      >
                        {faculty.name}
                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {(faculty[filterlib[Number(filter)]] !== undefined && faculty[filterlib[Number(filter)]].gold !== undefined) ? faculty[filterlib[Number(filter)]].gold
                        : 0 }
                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {(faculty[filterlib[Number(filter)]] !== undefined && faculty[filterlib[Number(filter)]].silver !== undefined) ? faculty[filterlib[Number(filter)]].silver
                        : 0 }

                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {(faculty[filterlib[Number(filter)]] !== undefined && faculty[filterlib[Number(filter)]].bronze !== undefined) ? faculty[filterlib[Number(filter)]].bronze
                        : 0 }

                      </td>
                      <td
                        className="px-6 border-3 border-ungugaje"
                        style={{ "borderBottom": "none" }}
                      >
                        {(faculty[filterlib[Number(filter)]] !== undefined && faculty[filterlib[Number(filter)]].total !== undefined) ? faculty[filterlib[Number(filter)]].total
                        : 0 }
                      </td>
                    </tr>
                  ))}
                </tbody>
              )
            }
          })()}
        </table>
      </div>
      <div className = 'flex justify-between mx-4 md:mx-20'>
        <button
          className="cursor-pointer transform scale-50 md:scale-100 transition duration-300 md:hover:scale-105"
          onClick={goBack}
        >
          <img src={`${process.env.PUBLIC_URL}/images/News/Back.png`} alt="" />
        </button>
        {filter !== "0" ? <a
          className="cursor-pointer transform scale-50 md:scale-100 transition duration-300 md:hover:scale-105"
          key={filtercabdetaillib[Number(filter)]}
          href={`${process.env.PUBLIC_URL}/cabor/${filtercabdetaillib[Number(filter)]}`}
        >
          <img src={`${process.env.PUBLIC_URL}/images/Standings/Detail.png`} alt="" />
        </a> : ""}
      </div>
      <div className="h-4 md:h-20"></div>
    </div>
  );
};
export { Standings };
