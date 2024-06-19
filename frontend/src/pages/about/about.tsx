import React from 'react';
import './about.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Our Web Dictionary</h1>
      <section>
        <h2>Our Mission</h2>
        <p>Our mission is to provide a comprehensive and accurate web dictionary for developers and technology enthusiasts. We aim to be the go-to resource for anyone looking to understand technical terms and concepts.</p>
        <p>우리의 임무는 개발자와 기술 애호가를 위한 포괄적이고 정확한 웹 사전을 제공하는 것입니다. 우리는 기술 용어와 개념을 이해하려는 모든 사람에게 유용한 리소스가 되는 것을 목표로 합니다.</p>
      </section>
      <section>
        <h2>Our Team</h2>
        <p>Our team consists of experienced developers and tech enthusiasts who are passionate about sharing knowledge. Each member brings a unique set of skills and expertise to the table.</p>
        <p>우리 팀은 지식 공유에 열정적인 숙련된 개발자와 기술 애호가로 구성되어 있습니다. 각 회원은 고유한 기술과 전문 지식을 테이블에 가져옵니다.</p>
      </section>
      <section>
        <h2>Technologies We Use</h2>
        <p>We built this site using the latest web technologies, including React for the frontend, Flask for the backend, and MySQL for the database. These technologies ensure that our site is fast, reliable, and scalable.</p>
        <p>우리는 프론트엔드용 React, 백엔드용 Flask, 데이터베이스용 MySQL을 포함한 최신 웹 기술을 사용하여 이 사이트를 구축했습니다. 이러한 기술을 통해 당사 사이트는 빠르고 안정적이며 확장 가능합니다.</p>
      </section>
      <section>
        <h2>History</h2>
        <p>Our web dictionary project started in 2023 with the goal of simplifying the learning process for new developers. Over the years, we have continuously improved and expanded our content.</p>
        <p>우리의 웹 사전 프로젝트는 신규 개발자의 학습 과정을 단순화한다는 목표로 2023년에 시작되었습니다. 수년에 걸쳐 우리는 콘텐츠를 지속적으로 개선하고 확장해 왔습니다</p>
      </section>
      <section>
        <h2>Future Plans</h2>
        <p>We plan to add more features such as user contributions, interactive tutorials, and more. Stay tuned for updates!</p>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>If you have any questions or feedback, feel free to reach out to us at contact@webdictionary.com or follow us on social media.</p>
      </section>
      <section>
        <h2>FAQ</h2>
        <p>Check out our FAQ section for answers to common questions about our site and services.</p>
      </section>
    </div>
  );
};

export default About;
