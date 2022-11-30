// import Rate from "./Rate";
import Rate from "./Rate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLocationDot} from '@fortawesome/free-solid-svg-icons'
import {faHotel} from '@fortawesome/free-solid-svg-icons'
import {faSackDollar} from '@fortawesome/free-solid-svg-icons'

const Search = () => {
    const count = 4
    return ( 
        <div className="search-content">
            <div className="search-input">
                <input type="text" name="search" id="search" placeholder="Search for Institutes..."/>
            </div>
            <div className="container">
                <div className="upper">
                <h2 className="title">FAST NUCES</h2>
                <Rate className="stars" count={count}/>
                <h5 className="private-public">Private</h5>
                </div>
                <div className="loc">
                    <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                    <h5>ISB, KAR, PWR, LHR, Chiniot</h5>
                </div>
                <div className="loan-hostel">
                    <div className="hostel">
                        <FontAwesomeIcon icon={faHotel}></FontAwesomeIcon>
                        <p>Hostel Accommodation:</p>
                        <h4 className="btn-yes">Yes</h4>
                    </div>
                    <div className="loan">
                        <FontAwesomeIcon icon={faSackDollar}></FontAwesomeIcon>
                        <p>Loan/Scholarship:</p>
                        <h4 className="btn-no">No</h4>
                    </div>
                </div>
                <div className="programs-fee">
                    <button className="programs">Programs Info</button>
                    <button>Fee Structure</button>
                </div>
            </div>

        </div>
     );
}
 
export default Search;