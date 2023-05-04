import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

/**
 * 2초 지연을 시키는 함수입니다 (비동기 작업).
 */
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds();
    const { title, body } = payload;
    const id = Date.now().toString();

    const todo = {
      id,
      title,
      body,
    };
    return todo;
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (id, thunkAPI) => {
    await waitTwoSeconds();
    return id;
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: {
    [__addToDo.fulfilled]: (state, action) => {
      state.list.push(action.payload);
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.list = state.list.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
