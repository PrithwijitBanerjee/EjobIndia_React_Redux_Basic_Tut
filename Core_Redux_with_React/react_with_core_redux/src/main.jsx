import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { accReducer } from './reducers/accountsReducer.js'
import { bonusReducer } from './reducers/bonusReducer.js'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import { thunk } from 'redux-thunk'
// import './index.css'

// combining multiple reducers ....

const rootReducer = combineReducers({
  accounts: accReducer,
  bonus: bonusReducer
})

// creating global store in redux ...

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
