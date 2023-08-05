import { createContext, useReducer } from "react";
import reducer, {initialState} from "./reducer";

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
const [state, dispatch] = useReducer(reducer, initialState);

return(
<StoreContext.Provider value={{ state, dispatch }}>
{children}
</StoreContext.Provider>
);
};