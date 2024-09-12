import React, { useEffect, useState } from 'react'
import styles from'./MainSlider.module.css';
import Slider from 'react-slick';
import Slider1 from '../../assets/images/41nN4nvKaAL._AC_SY200_.jpg';
import Slider2 from '../../assets/images/61cSNgtEISL._AC_SY200_.jpg';
import Slider3 from '../../assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg';
import Slider4 from '../../assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg';
import Slider5 from '../../assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg';
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
    useEffect(()=>{},[]);
    let[count,setCount]=useState(0)
  return (
    <>
    <div className="row justify-center">
      <div className="w-1/4 ">
      <Slider className=' ' {...settings}>
<img src={Slider1} className='' alt="" />
<img src={Slider2} alt="" />
      </Slider>

      </div>
      <div className="w-1/4">
      <img src={Slider3} className='' alt="" />
<img src={Slider5} alt="" />
      </div>
    </div>
    </>
  )
}
