import {applyMiddleware, combineReducers, legacy_createStore,} from "redux"
import thunk from "redux-thunk"
import {reducer as AuthReducer} from "./Authentication/reducer"
import {adminReducer} from "./AdminRedux/adminReducer"
import supportReducer from "./SupportRedux/reducer"
import profileReducer from "./UserRedux/reducer"
import bankApplicationReducer from "./BankApplication/reducer"
import loansReducer from "./LoanRedux/reduxer"
import paymentReducer from "./PaymentRedux/reducer"

const rootreducer = combineReducers({
    AuthReducer,
    adminReducer,
    bankApplicationReducer,
    supportReducer,
    profileReducer,
    loansReducer,
    paymentReducer
})
export const store = legacy_createStore(rootreducer, applyMiddleware(thunk))