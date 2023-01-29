// import Rate from "./Rate";
import Rate from "./Rate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";

const Search = ({ university, key, border }) => {
  return (
    <div className="search-content">
      <a
        href={university.Main_link}
        target="_blank"
        rel="noopener noreferrer"
        className="container-link"
        style={{ color: "black" }}
      >
        <div className="container" style={{ border: border }}>
          <div className="upper">
            <h2 className="title">{university.university_name}</h2>
            <Rate
              className="stars"
              count={university.rating}
              key={university._id}
            />
            <h5 className="private-public">{university.public_private}</h5>
          </div>
          <div className="loc">
            <FontAwesomeIcon
              icon={faLocationDot}
              color={"#969696"}
            ></FontAwesomeIcon>
            <h5>{university.campuses}</h5>
          </div>
          <div className="loan-hostel">
            <div className="hostel">
              <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>
              <p>Hostel Accommodation:</p>
              {university.hostels_acc === "Yes" ? (
                <h4 className="btn-yes">{university.hostels_acc}</h4>
              ) : (
                <h4 className="btn-no">{university.hostels_acc}</h4>
              )}
            </div>
            <div className="loan">
              <FontAwesomeIcon icon={faSackDollar}></FontAwesomeIcon>
              <p>Loan/Scholarship:</p>
              {university.loan_scholarship === "Yes" ? (
                <h4 className="btn-yes">{university.loan_scholarship}</h4>
              ) : (
                <h4 className="btn-no">{university.loan_scholarship}</h4>
              )}
            </div>
          </div>
          <div className="programs-fee">
            <a
              href={university.Programs_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="programs">Programs Info</button>
            </a>
            <a
              href={university.Fee_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Fee Structure</button>
            </a>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Search;
