import { useSelector } from "react-redux"
import Accounts from "./components/Accounts";
import Bonus from "./components/Bonus";

function App() {
  const amount = useSelector(state => state.accounts.amount);
  const points = useSelector(state => state.bonus.points);
  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="row">
        <div className="col-12">
          <h1>Core Redux Project with React</h1>
        </div>
        <div className="col-12 my-4">
          <h4>Total Amt: {amount}</h4>
          <h4>Points: {points}</h4>
        </div>
        <div className="col-12 my-5">
          <Accounts />
          <Bonus />
        </div>
      </div>
    </div>
  )
}

export default App
