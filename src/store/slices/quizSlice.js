import { createSlice } from "@reduxjs/toolkit";

const storedQuizUserData = JSON.parse(localStorage.getItem("quizUserData"));

const initialState = {
  quizUserData: storedQuizUserData || [],
  loading: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    setQuizUserData(state, action) {
      const data = action.payload;
      if (Array.isArray(data)) {
        state.quizUserData = data;
      } else {
        const { question, selectedOption } = data;
        const existingIndex = state.quizUserData.findIndex(
          (item) => item.question.id === question.id
        );
        if (existingIndex !== -1) {
          state.quizUserData[existingIndex].selectedOption = selectedOption;
        } else {
          state.quizUserData.push({ question, selectedOption });
        }
      }
    },

    setLoading(state, value) {
      state.loading = value.payload;
    },
  },
});

export const { setQuizUserData, setLoading } = quizSlice.actions;
export default quizSlice.reducer;
