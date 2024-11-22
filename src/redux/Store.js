import { configureStore } from "@reduxjs/toolkit";
import recipieslice from './slices/Slice'

 const Recipietore=configureStore({
    reducer:{
       
        RecipieReducer:recipieslice

    }

})
export default Recipietore