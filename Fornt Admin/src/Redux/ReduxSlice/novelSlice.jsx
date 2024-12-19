import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://26.232.136.42:8080/api/novel';

// Utility function for error handling in async thunks
const handleError = (error, rejectWithValue) =>
    rejectWithValue(
        error.response?.data?.message || 'An unexpected error occurred',
    );

// Async Thunks
export const fetchNovels = createAsyncThunk(
    'novel/fetchNovels',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovelsNoChapter`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);
export const deleteNovel = createAsyncThunk(
    'novel/deleteNovel',
    async (idNovel, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/deleteNovel?idNovel=${idNovel}`);
            return idNovel;
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Failed to delete novel',
            );
        }
    },
);
export const fetchNovelOnlyName = createAsyncThunk(
    'novel/fetchNovelOnlyName',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getAllNovelsJustIdAndName`,
            );
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const createNovel = createAsyncThunk(
    'novel/createNovel',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/createNovel`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            return response.data.result || 'Novel created successfully';
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const updateNovel = createAsyncThunk(
    'novel/updateNovel',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/updateNovel`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } },
            );
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Fetch novel by name
export const fetchNovelByName = createAsyncThunk(
    'novel/fetchNovelByName',
    async (name, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/getNovelByName?name=${name}`,
            );
            return response.data.result || {};
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Additional Fetch Functions (Optional)
export const fetchNovelsNoImage = createAsyncThunk(
    'novel/fetchNovelsNoImage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovelsNoImage`);
            return response.data.result || [];
        } catch (error) {
            return rejectWithValue(
                error.response?.data || 'Error fetching novels',
            );
        }
    },
);

// Add Category/Author/POV
export const addCategory = createAsyncThunk(
    'novel/addCategory',
    async ({ nameCategory, idNovel }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/addCategory?nameCategory=${nameCategory}&idNovel=${idNovel}`,
            );
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const addAuthor = createAsyncThunk(
    'novel/addAuthor',
    async ({ idAuthor, idNovel }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/addAuthor?idAuthor=${idAuthor}&idNovel=${idNovel}`,
            );
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

export const addPOV = createAsyncThunk(
    'novel/addPOV',
    async ({ namePointOfView, idNovel }, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/addPOV?namePOV=${namePointOfView}&idNovel=${idNovel}`,
            );
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Carousel Images
export const fetchImages = createAsyncThunk(
    'carousel/fetchImages',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/getNovelsNoChapter`);
            return response.data.result || [];
        } catch (error) {
            return handleError(error, rejectWithValue);
        }
    },
);

// Slice
const novelSlice = createSlice({
    name: 'novel',
    initialState: {
        novels: [],
        currentNovel: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNovels.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNovels.fulfilled, (state, action) => {
                state.loading = false;
                state.novels = action.payload;
            })
            .addCase(fetchNovels.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchNovelOnlyName.fulfilled, (state, action) => {
                state.novels = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchNovelsNoImage.fulfilled, (state, action) => {
                state.novelsNoImage = action.payload;
            })
            .addCase(createNovel.fulfilled, (state, action) => {
                state.novels.push(action.payload);
                state.loading = false;
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                state.currentNovel.categories = [
                    ...state.currentNovel.categories,
                    ...action.payload,
                ];
            })
            .addCase(deleteNovel.fulfilled, (state, action) => {
                state.loading = false;
                state.novels = state.novels.filter(
                    (novel) => novel.idNovel !== action.payload,
                );
                state.lastUpdated = new Date().toISOString();
            })
            .addCase(deleteNovel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete chapter';
            })
            .addCase(addAuthor.fulfilled, (state, action) => {
                state.currentNovel.authors = [
                    ...state.currentNovel.authors,
                    ...action.payload,
                ];
            })
            .addCase(addPOV.fulfilled, (state, action) => {
                state.currentNovel.pov = [
                    ...state.currentNovel.pov,
                    ...action.payload,
                ];
            })
            .addCase(updateNovel.fulfilled, (state, action) => {
                const index = state.novels.findIndex(
                    (novel) => novel.idNovel === action.payload.idNovel,
                );
                if (index !== -1) {
                    state.novels[index] = {
                        ...state.novels[index],
                        ...action.payload,
                    };
                }
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload || 'An unexpected error occurred';
                },
            );
    },
});

export default novelSlice.reducer;
