import { useSelector } from "react-redux"
import Account from "./components/Account"
import Bonus from "./components/Bonus"
// import Reward from "./components/Reward";


function App() {
  const { amount, status } = useSelector(state => state?.account);
  const points = useSelector(state => state?.bonus?.points);

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="row">
          <div className="col-md-12">
            <h2>Total Amt: {
              status === 'ERROR' && <span className="text-danger">Something Went Wrong !!!</span>
            }
              {
                status === 'LOADING' && <span className="text-success">loading....</span>
              } 
              {
                status === 'FULFILLED' && amount && amount
              }
              </h2>
            <h2>Total Points: {points}</h2>
          </div>
          <div className="col-md-12">
            <Account />
            <Bonus />
            {/* <Reward /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
