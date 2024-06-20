import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { empty_cart, fetchAllCartProducts, remove_cart } from "../reducers/cartSlice";
import { STATUSES } from "../utils/statusObj";
import { Vortex } from "react-loader-spinner";


const Cart = () => {
    const dispatch = useDispatch();
    const { cartProducts, status, errMsg, cartIds } = useSelector(state => state?.carts);
    useEffect(() => {
        dispatch(fetchAllCartProducts(cartIds));
        return () => { // cleanUp function similar as componentWillUnmount() ...
            dispatch(empty_cart());
        }
    }, []);

    const handleRemoveCart = id => {
        dispatch(remove_cart(id));
    }

    if (status === STATUSES.REJECTED) {
        return (<div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-danger">{errMsg}</h2>
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
        <div className="my-5 mx-auto" style={{ width: '90%' }}>
            <table className="table table-striped table-responsive table-borderless">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Image</th>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Ratings</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartProducts?.length === 0 && (
                            <tr>
                                <th colSpan={6} className="text-center">
                                    <h5 className="text-danger my-3">Empty Cart!!!</h5>
                                </th>
                            </tr>
                        )
                    }
                    {
                        cartProducts?.length !== 0 && cartProducts?.map(item => (
                            <tr key={item?.id} className="align-items-center">
                                <th scope="row">{item?.id}</th>
                                <td> <img src={item?.image} alt="" width={50} height={50} /> </td>
                                <td>{item?.title}</td>
                                <td>{item?.price}</td>
                                <td>{item?.rating && item?.rating?.rate}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemoveCart(item?.id)}
                                        className="btn btn-danger mt-2">remove item</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default Cart