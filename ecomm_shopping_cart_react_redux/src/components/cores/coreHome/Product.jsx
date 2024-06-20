import PropTypes from 'prop-types';
import { add_to_cart } from '../../../reducers/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
    const { cartIds } = useSelector(state => state.carts);
    const dispatch = useDispatch(); // initialize the dispatch ...
    const { image, title, price, description, rating, category, id } = product;
    return (
        <div className="col">
            <div className="card" style={{ width: '18rem', height: '600px', margin: '5px' }}>
                <img src={image} className="card-img-top" alt="..." width={50} height={200} />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-title">Price: {price}</h6>
                    <p className="card-text">{description.slice(0, 30)}...</p>
                    <h6 className="card-title">Ratings: {rating && rating?.rate}</h6>
                    <h6 className="card-title">Category: {category}</h6>
                    <a href="#" className="btn btn-primary">View more</a>
                    <button className={cartIds.includes(id) ? "btn btn-success mx-2 disabled" : "btn btn-success mx-2"} onClick={() => dispatch(add_to_cart(id))}>{(cartIds.includes(id)) ? 'Already added' : 'Add to cart'}</button>
                </div>
            </div>
        </div>
    )
}

Product.propTypes = {
    product: PropTypes.object
}

export default Product