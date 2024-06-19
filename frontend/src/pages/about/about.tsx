import React from 'react';
import './about.css';

const About: React.FC = () => {
  return (
    <div className="about-container">
      <h1>About Our Web Dictionary</h1>
      <section>
        <h2>Our Mission</h2>
        <p>Our mission is to provide a comprehensive and accurate web dictionary for developers and technology enthusiasts. We aim to be the go-to resource for anyone looking to understand technical terms and concepts.</p>
      </section>
      <section>
        <h2>Our Team</h2>
        <p>Our team consists of experienced developers and tech enthusiasts who are passionate about sharing knowledge. Each member brings a unique set of skills and expertise to the table.</p>
      </section>
      <section>
        <h2>Technologies We Use</h2>
        <p>We built this site using the latest web technologies, including React for the frontend, Flask for the backend, and MySQL for the database. These technologies ensure that our site is fast, reliable, and scalable.</p>
      </section>
      <section>
        <h2>History</h2>
        <p>Our web dictionary project started in 2023 with the goal of simplifying the learning process for new developers. Over the years, we have continuously improved and expanded our content.</p>
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
