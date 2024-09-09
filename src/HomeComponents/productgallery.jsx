import '../Homepage.css'
import PropTypes from "prop-types";

function ProductGallery({bnbs,setSelectedRental,handleAddToCart}){
   return(
    <>
    {
        bnbs.map((bnb,index) =>{
            const handleAddToCartClick = () => {
                // Update the selectedRental state
                setSelectedRental(bnb);
                // Call the handleAddToCart function with the selected rental
                handleAddToCart(bnb);
              };
          return(
            <div className="img-card" key={`bnb-${index}`}>
                <div className='image'>
                    <img src={bnb.photoUrl} alt="image"/>  
                    <div className='text'>
                      <button> <h6>{bnb.itemname}</h6> </button>    
                    </div> 
                    <div className='reviews'>
                        <span className="material-symbols-outlined">favorite</span>
                    </div>
                </div>
                <div className='location'>
                    <p>{`${bnb.parentcategory} `}</p>
                    <div className='stars'>
                        <span className="material-symbols-outlined">star</span>
                        <p></p>
                    </div>
                </div>
                <div className='title'>
                    <p></p>
                </div>
                <div className='payment'>
                <p></p>
                 <button className='book-rental' type="button" onClick= {handleAddToCartClick}>Book Rental</button>
                </div>
                
            </div>
          )
        })
    }
    
    </>
   )
}


ProductGallery.propTypes = {
bnbs: PropTypes.arrayOf(PropTypes.object).isRequired,
setSelectedRental:PropTypes.func.isRequired,
handleAddToCart:PropTypes.func.isRequired
};

export default ProductGallery