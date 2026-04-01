import { combineReducers  } from "redux";
import userReducer from "./user.reducer";
import imoReducer from "./imo.reducer";


export default combineReducers({
    userReducer,
    imoReducer
})