import React from 'react'

const Title = () => {
    return (
        <div className = 'z-30 h-full mt-5 relative md:flex items-center md:items-stretch md:justify-start md:content-end' >
            <div className = 'h-2'></div>
            <div className = 'md:w-45c cursor-default'>
                <div className = 'flex md:items-stretch justify-center md:ml-28 md:justify-start md:content-end text-5xl md:text-fourteenvh md:mt-32 mt-8 text-biru font-nuku'> 
                    <div style = {{
                        "textShadow": [
                            "-1px -1px 0 #F8BF0D",
                            "-0.5px -1px 0 #F8BF0D",
                            "0px -1px 0 #F8BF0D",
                            "0.5px -1px 0 #F8BF0D",
                            "1px -1px 0 #F8BF0D",
                            "1.5px -0.5px 0 #F8BF0D",
                            "2px 0px 0 #F8BF0D",
                            "2.5px 0.5px 0 #F8BF0D",
                            "3px 1px 0 #F8BF0D",
                            "3.5px 1.5px 0 #F8BF0D",
                            "4px 2px 0 #F8BF0D",
                            "4.5px 3.5px 0 #F8BF0D",
                            "5px 3px 0 #F8BF0D",
                            "-1px 0px 0 #F8BF0D",
                            "-1px 1px 0 #F8BF0D",
                            "-0.5px 1.5px 0 #F8BF0D",
                            "0px 2px 0 #F8BF0D",
                            "0.5px 2.5px 0 #F8BF0D",
                            "1px 1px 0 #F8BF0D",
                            "1.5px 1.5px 0 #F8BF0D",
                            "2px 2px 0 #F8BF0D",
                            "2.5px 2.5px 0 #F8BF0D",
                            "3px 3px 0 #F8BF0D",
                            "3.5px 3.5px 0 #F8BF0D",
                            "4px 4px 0 #F8BF0D",
                            "4.5px 4.5px 0 #F8BF0D",
                            "5px 5px 0 #F8BF0D",
                            "1px 3px 0 #F8BF0D",
                            "1.5px 3.5px 0 #F8BF0D",
                            "2px 4px 0 #F8BF0D",
                            "2.5px 4.5px 0 #F8BF0D",
                            "3px 5px 0 #F8BF0D",
                        ],
                        'WebkitTextSizeAdjust':'none',
                        'MsTextSizeAdjust':'none',
                        'MozTextSizeAdjust':'none',
                        'textSizeAdjust':'none',
                    }}>PORSENIGAMA</div>
                </div>
                <p className = 'font-sansPro text-left md:ml-28 md:mr-8 md:mt-2 hidden md:flex md:text-threevh'>Pekan Olahraga dan Seni Universitas Gadjah Mada (Porsenigama) merupakan suatu ajang kejuaraan olahraga dan seni yang dilaksanakan 
                    atas dasar Rancangan Kegiatan Awal Tahun (RKAT) atau program kerja Forum Komunikasi (FORKOM) UKM Universitas Gadjah Mada. 
                    Porsenigama rutin dilaksanakan setiap tahunnya sebagai wadah penyaluran minat dan bakat mahasiswa Universitas Gadjah Mada (UGM) di 
                    bidang non-akademik, khususnya bidang olahraga dan seni. Porsenigama sendiri bertujuan untuk menumbuhkan kreativitas dan 
                    sportivitas dalam perlombaan yang adil di kalangan mahasiswa UGM. 
                </p>
            </div>
            <div className = 'md:hidden text-xs w-2/5 ml-4 font-sansPro absolute text-justify mt-4'>
                Pekan Olahraga dan Seni Universitas Gadjah Mada merupakan suatu ajang kejuaraan olahraga dan seni yang dilaksanakan 
                atas dasar RKAT FORKOM UKM Universitas Gadjah Mada.
            </div>
            <div className = 'h-full relative overflow-hidden hidden md:flex'>
                {/* <img src={`${process.env.PUBLIC_URL}/images/Title/Sun.svg`} alt="Sun behind Pagoda" className = 'z-30 absolute mt-20 ml-6 transform scale-95 overflow-hidden' style = {{
                    'MozUserSelect': 'none',
                    'WebkitUserSelect': 'none',
                    'userSelect':' none',
                    'pointerEvents': 'none'
                }}/> */}
                <img src={`${process.env.PUBLIC_URL}/images/Title/Group 5.svg`} alt="Images of Pagoda" className = 'z-50 relative right-10 mt-6 transform scale-95' style = {{
                    'MozUserSelect': 'none',
                    'WebkitUserSelect': 'none',
                    'userSelect':' none',
                    'pointerEvents': 'none'
                }}/>
            </div>
            <img src={`${process.env.PUBLIC_URL}/images/Title/Group 45.png`} alt="Mountain" className = 'z-40 absolute mt-2 md:mt-12' style = {{
                'MozUserSelect': 'none',
                'WebkitUserSelect': 'none',
                'userSelect':' none',
                'pointerEvents': 'none'
            }}/>
            <div className = 'h-20 md:h-24'></div>
        </div>
    )
}

export { Title }
