import React from 'react';
import './about.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>Co_Wiki 소개</h1>
      <section>
        <h2>우리의 목표</h2>
        <p>우리의 임무는 개발자와 기술 애호가를 위한 포괄적이고 정확한 웹 사전을 제공하는 것입니다. 우리는 기술 용어와 개념을 이해하려는 모든 사람에게 유용한 리소스가 되는 것을 목표로 합니다.</p>
      </section>
      <section>
        <h2>우리의 팀</h2>
        <p>우리 팀은 지식 공유에 열정적인 숙련된 개발자와 기술 애호가로 구성되어 있습니다. 각 회원은 고유한 기술과 전문 지식을 테이블에 가져옵니다.</p>
        <h3>김대현</h3>
        <p>2018-02~2018-08 오버워치 프로게임단 Maxtill SomeDay 소속<br></br>2018-09~2019-02 유베이스 지마켓 메일팀 <br></br>2019-02~2019-10 서울게임아카데미 프로게이머부 코치<br></br><div>https://github.com/Sinsu78</div></p>
        <h3>이인성</h3>
        <p>2019-03-08 ~ 2019-12-09 sbs 드라마 스크립터<br></br>2020-01 ~ 2020-04 스튜디오 촬영보조 및 편집<br></br><div>https://github.com/slowtree999</div> </p>
      </section>
      <section>
        <h2>우리가 사용하는 기술</h2>
        <p>우리는 프론트엔드용 React, 백엔드용 Flask, 데이터베이스용 MySQL을 포함한 최신 웹 기술을 사용하여 이 사이트를 구축했습니다. 이러한 기술을 통해 당사 사이트는 빠르고 안정적이며 확장 가능합니다.</p>
      </section>
      <section>
        <h2>역사</h2>
        <p>우리의 웹 사전 프로젝트는 신규 개발자의 학습 과정을 단순화한다는 목표로 2023년에 시작되었습니다. 수년에 걸쳐 우리는 콘텐츠를 지속적으로 개선하고 확장해 왔습니다</p>
      </section>
      <section>
        <h2>향후 계획</h2>
        <p>우리는 사용자 기여, 대화형 튜토리얼 등과 같은 더 많은 기능을 추가할 계획입니다. 업데이트를 계속 지켜봐주세요!</p>
      </section>
    </div>
  );
};

export default About;
