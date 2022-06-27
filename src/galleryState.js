import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const getPhotos = createAsyncThunk(
    'photos/getPhotos',
    async () => {
        const random = Math.ceil(Math.random() * 10);
        const response = await fetch(`https://picsum.photos/v2/list?page=${random}&limit=9`);
        const json = await response.json();
        return json;
    }
)

export const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        photos: [],
        isLoading: false,
    },
    extraReducers: {
        [getPhotos.pending]: (state) => {
            state.isLoading = true;
        },
        [getPhotos.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.photos = action.payload;
        },
        [getPhotos.rejected]: (state) => {
            state.isLoading = false;
        }
    }
})

export default gallerySlice.reducer;