import {legacy_createStore as createStore} from 'redux';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {createSlice, configureStore, createAsyncThunk} from '@reduxjs/toolkit';

//redux 라이브러리의 reducer 함수 
const reducer = (state, action) => {
  if(action.type === 'up') {
    return {...state, value:state.value + action.step} //불변성 유지를 위해 스레드 연산자를 이용하여 기존의 값을 복사
  }

  return state;
}

//reduxtoolkit thunk 사용. 비동기 처리해서 나올 state를 store에서 관리하기 위한 것.
const asyncUpFetch = createAsyncThunk(
  'counterSlice/asyncUpFetch', //식별자 --> 만드는 규칙 x 
  async () => {
    const resp = await fetch('http://127.0.0.1:8080/restapi/visit');
    const data = await resp.json();
    return data.rvalue;
  }
)

//redux-toolkit을 사용
const counterSlice = createSlice({
  name: 'counterSlice',  //slice 이름
  initialState: {value:0, rvalue:0, status:'Welcome'}, //초기값
  reducers: { //type 별로 실행함수를 만듬
    up:(state, action) => {
      console.log(action);
      state.value = state.value + action.step; //redux-toolkit을 사용하면 불변성 고려할 필요가 없음
    }
  },
  extraReducers:(builder) => {
    builder.addCase(asyncUpFetch.pending, (state,action) => {
      state.status = 'Loading';
    });
    builder.addCase(asyncUpFetch.fulfilled, (state,action) =>{
      state.rvalue = action.payload;
      state.status ='Complete';
    });
    builder.addCase(asyncUpFetch.rejected, (state,action) => {
      state.status = 'Fail';
    })
  }
})

const initialStateRedux = {value:0};
//Redux에서는 하나의 store에 모든 state가 저장되는 것에 반해서 redux-toolkit은 slice를 사용해서 각각의 state별로 slice를 사용해서 
//state를 모아 둘 수가 있고, 이 slice를 configureStore로 하나의 store로 모아서 저장 
const storeRedux = createStore(reducer,initialStateRedux);

const storeReduxToolkit = configureStore({
  reducer: {
    counter:counterSlice.reducer //counter라는 reducer생성
  }
});

const App = () => {
  return(
    <div>
      <Provider store={storeRedux}>
        <CounterRedux />
      </Provider>
      <Provider store={storeReduxToolkit}>
        <CounterReduxToolKit />
        <AsyncExam />
      </Provider>
    </div>
  )
}

//Redux 라이브러리를 사용
const CounterRedux = () => {
  const dispatch = useDispatch();
  const CountRedux = useSelector((state) => state.value);
  return (
    <div>
      <button onClick={
        ()=> {dispatch({type:'up', step:2})} //dispatch의 인자. 즉, action을 reduce에게로 전송
      }>Redux 사용해서 state값 증가</button> {CountRedux} <br/>
    </div>
  )
}


//redux-toolkit 이용
const CounterReduxToolKit = () => {
  const dispatch = useDispatch();
  const CountReduxToolkit = useSelector((state)=>state.counter.value)
  return (
    <div>
      <button onClick={
        () => {
          dispatch({type:'counterSlice/up', step:1});
      }}>redux toolkit을 사용해서 state 값 증가</button> {CountReduxToolkit}
    </div>
  )
}

//redux-toolkit thunk 사용해서 비동기 처리
const AsyncExam = () =>{
  const dispatch = useDispatch();
  const rValue = useSelector((state) => state.counter.rvalue);
  const status = useSelector((state) => state.counter.status);
  return (
    <div>
      <button onClick={
        ()=> {
          dispatch(asyncUpFetch());
        }}>Thunk 사용해서 비동기처리</button> {rValue} | {status}
    </div>
  )
}
export default App;
