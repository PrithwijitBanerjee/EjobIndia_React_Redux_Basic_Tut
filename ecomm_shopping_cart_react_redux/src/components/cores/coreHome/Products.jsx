import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../../reducers/productsSlice";
import { STATUSES } from "../../../utils/statusObj";
import { Vortex } from "react-loader-spinner";
import Product from "./Product";


const Products = () => {
    const dispatch = useDispatch(); // initialize the dispatch ...
    const { products, status, errMsg } = useSelector(state => state?.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    if (status === STATUSES.REJECTED) {
        return (<div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-danger">{errMsg && 'Something Went Wrong!!!'}</h2>
                </div>
            </div>
        </div>)
    }
    if (status === STATUSES.LOADING) {
        return (<div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <Vortex
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                </div>
            </div>
        </div>)
    }
    return (
        <div className="container my-5">
            <div className="row">
                {
                    products && products?.length !== 0 && products.map(product => (
                        <Product key={product?.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default Products