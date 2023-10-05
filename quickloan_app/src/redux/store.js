import {applyMiddleware, combineReducers, legacy_createStore,} from "redux"
import thunk from "redux-thunk"
import {reducer as ProductReducer} from "./ProductRedux/reducer"
import {reducer as AuthReducer} from "./Authentication/reducer"
import {adminReducer} from "./AdminRedux/adminReducer"
import supportReducer from "./SupportRedux/reducer"
import profileReducer from "./UserRedux/reducer"
import { reducer as bankApplicationReducer } from "./BankApplication/reducer";
const rootreducer = combineReducers({ProductReducer,AuthReducer,adminReducer,bankApplicationReducer,supportReducer, profileReducer})
export const store =legacy_createStore(rootreducer,applyMiddleware(thunk))