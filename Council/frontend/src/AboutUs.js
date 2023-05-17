import { Link } from "react-router-dom";

const AboutUs = () => {
  window.scrollTo(0, 0);
  return (
    <div className="aboutUs">
      <div className="heading-aboutUs" tabIndex={0}>
        <h1>Our Motive</h1>
      </div>
      <div className="content-aboutUs">
        <p>
          One of the biggest challenges for every young adult is to find the
          right educational institutes according to their preference and
          interest. Cases of students dropping out at the beginning of the
          semester are also quite significant. The main cause of failure is the
          selection of the right institutes that fits the user’s preferences.
          The traditional method of getting recommendation is to either search
          global universities ranking on the internet or asking other peers for
          their suggestions. This way is inefficient, unreliable and it also
          doesn’t keep the user’s interests in mind. If an overseas student is
          thinking over further education in Pakistan, then he/she will have a
          hard time of which university to choose on. This project aims to solve
          all of these problems by having a platform which requires all the
          relevant input from the user (such as a user’s transcript, interests,
          budget, location etc.), and it applies different machine learning
          algorithms to give an output in the form of a list of different
          institutes that are ranked according to the user’s input along with
          the features of each institute which tells that why it is being
          recommended.
        </p>
      </div>
      <div className="heading-aboutUs">
        <h1>Our Goal</h1>
      </div>
      <div className="content-aboutUs">
        <p>
          Any user who is seeking for an Educational Institute are overloaded
          with information on the internet. Our main objective is to have a
          platform which allows the students to see every option which is
          relevant to them. The recommendation system will rank institutes based
          on how closely they match a user’s preference. The user’s preferences
          might includes its location, the amount of budget allocated, academic
          profile etc.
        </p>
      </div>
      <div className="heading-aboutUs">
        <h1>Project Scope</h1>
      </div>
      <div className="content-aboutUs">
        <p>
          Our target audience primarily focuses on all types of students and
          parents. Student’s might include pupils who are looking for secondary
          schools or below, or undergraduates/ postgraduates students seeking
          for universities for their bachelors/masters/PHD’s. Our platform is
          also designed for parents so that they could finds whats best suited
          for their son/daughter and will make sure that every user could get
          their recommendation based on their preference and needs. This could
          be expanded Internationally since the only thing needed is the data.
        </p>
      </div>
      <div className="heading-aboutUs">
        <h1>Constraints</h1>
      </div>
      <div className="content-aboutUs">
        <p>
          Our project is fully dependent on how much data we have, because this
          data is used in training our machine learning model which generates
          recommendation for the end user. The more data of already enrolled
          students we have, the better the accuracy of the model.
        </p>
      </div>
      <div className="blue-bg">
        <div className="help-content">
          <h1>Help us in making our recommendation better!</h1>

          {/* <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdhEsL0N4EtDaUGam50_gxvUMGGMARItFZ24pdBrWaYhFposg/viewform"
            target={"_blank"}
            rel={"noreferrer"}
          >
            <button>Why Not.</button>
          </a> */}
          <Link to={"/login"}>
            <button>Why Not.</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
