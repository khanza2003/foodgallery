import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipies = createAsyncThunk('recipies/fetchRecipies', async () => {
    try {
        const result = await axios.get('https://dummyjson.com/recipes');
        console.log(result.data); 
        sessionStorage.setItem("allRecipies", JSON.stringify(result.data.recipes));
        return result.data.recipes; 
    } catch (error) {
        console.error("API fetch error:", error);
        throw error;
    }
});

const recipieslice = createSlice({
    name: 'recipies',
    initialState: {
        allRecipies: [],
        loading: false,
        errorMsg: "",
    },
    reducers: {
        filterRecipiesByCuisine: (state, action) => {
            const query = action.payload.toLowerCase();
            state.filteredRecipies = state.allRecipies.filter(recipe =>
                recipe.cuisine?.toLowerCase().includes(query)
            );
        },
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipies.fulfilled, (state, action) => {

                state.allRecipies = action.payload;
                state.filteredRecipies = action.payload;
                state.loading = false;
                state.errorMsg = "";
            })
            .addCase(fetchRecipies.pending, (state) => {
                state.allRecipies = [];
                state.filteredRecipies = [];
                state.loading = true;
                state.errorMsg = "";
            })
            .addCase(fetchRecipies.rejected, (state) => {
                state.allRecipies = [];
                state.filteredRecipies = [];
                state.loading = false;
                state.errorMsg = "API call failed";
            });
    },
});
export const { filterRecipiesByCuisine } = recipieslice.actions; 
export default recipieslice.reducer;