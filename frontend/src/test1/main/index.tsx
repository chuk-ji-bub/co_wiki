import React, { useRef } from 'react';
import './style.css';
import Header from '../../components/Header/Header';
import S1 from './../../components/Slide/s1'; // 슬라이드 1 컴포넌트 가져오기
import S2 from './../../components/Slide/s2'; // 슬라이드 2 컴포넌트 가져오기
import S3 from './../../components/Slide/s3'; // 슬라이드 3 컴포넌트 가져오기

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';


const SlickSlider = () => {
  const settings = {


    infinite: false, // 무한 루프
    speed: 500, // 슬라이드 전환 속도 
    slidesToShow: 1, // 화면에 보여질 슬라이드 수
    slidesToScroll: 1, // 슬라이드를 넘길 때 이동할 슬라이드 수
    accessibility: true, //키보드로 이동가능하게 하는건데 안됨 수발
    
    arrows: false, //옆으로 이동하는 화살표 표시 
    swipe:false, //마우스로 끄는거 

  };

  const sliderRef = useRef<Slider>(null);


  const handleWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    // 마우스 휠 이벤트 핸들러
    if (e.deltaY > 0) {
      // 아래로 스크롤할 때
      sliderRef.current?.slickNext(); // 다음 슬라이드로 이동
    } else {
      // 위로 스크롤할 때
      sliderRef.current?.slickPrev(); // 이전 슬라이드로 이동
    }
  };
  
  

  return (
      <div onWheel={handleWheel}>
        <Header/>
        <div className="fullscreen-slider">
          <Slider {...settings} ref={sliderRef}>
            <S1 />
            <S2 />
            <S3 />
          </Slider>
        </div>
      </div>
  );
};

export default SlickSlider;