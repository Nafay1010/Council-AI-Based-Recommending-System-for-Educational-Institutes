import {FaStar} from 'react-icons/fa'

const Rate = ({count}) => {
    return ( 
        <div>
            {[...Array(count)].map((star, i)=>{
                return(
                    <label >
                        <input 
                            type="radio" 
                            name='rating'
                        />
                        <FaStar
                        className="star"
                        size={15}
                        />
                    </label>
                )
            })}
        </div>
     );
}
 
export default Rate;
