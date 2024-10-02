import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  video: null,
  thumbnail: null,
  title: null,
  description: null,
  isPublished: true,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    uploadVideo: (state, action) => {
        const { name, lastModified, lastModifiedDate, size, type } = action.payload;

        // Store only the relevant data in the state
        state.video = {
          name,
          lastModified,
          lastModifiedDate,
          size,
          type,
        };
    },
    uploadThumbnail: (state, action) => {
      // Extract relevant information from the File object
      const { name, lastModified, lastModifiedDate, size, type } = action.payload;
      
      const lastModifiedTimestamp = lastModifiedDate.getTime();

      // Store only the relevant data in the state
      state.thumbnail = {
        name,
        lastModified,
        lastModifiedTimestamp,
        size,
        type,
      };
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setIsPublished: (state, action) => {
      state.isPublished = action.payload;
    },
    resetAll: (state) => {
      state.title = null;
      state.thumbnail = null;
      state.video = null;
      state.thumbnail = null;
      state.isPublished = true;
    },
  },
});

export const { uploadVideo, uploadThumbnail, setTitle, setDescription, setIsPublished, resetAll } = uploadSlice.actions;
export default uploadSlice.reducer;
