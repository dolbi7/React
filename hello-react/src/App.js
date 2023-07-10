import { useState } from 'react';
import './App.css';
import SubApp from './SubApp';
import PropTypes from 'prop-types';

const App = () => {
  const name = '리액트';
  return (
    <div className = 'react'>
        <h1>props 예제</h1>
        <h1>이번 프로젝트는 {name} 프로젝트 입니다.</h1>
        <hr/>
        <br/>
        <SubApp/>
        <MyComponent name="김상경" favoriteNumber = {1}>KIM</MyComponent>
        <h1>state예제</h1>
        <MyState/> <br/>
        <hr></hr>
        <Say/>
        <hr/>
        <EventPractice/>
        <IterationSample/>
        </div>
   );
  }
const MyComponent = ({name,favoriteNumber,children}) => {

  return (
    <div>
      <h1>Props 예제</h1>
      안녕하세요? 나의 이름은 {name}입니다.<br/>
      Children 값은 {children}입니다. <br/>
      제가 가장 좋아하는 숫자는 {favoriteNumber}입니다.
   $ </div>

  );

}

//전달 받은 props 값이 없을 경우 사용됨.
MyComponent.defaultProps = {
  name: '김철수'
}

MyComponent.prototype = {
  name:PropTypes.string,
  favoriteNumber:PropTypes.string.isRequired
};

//렌더링되서 state가 변경되면 변수가 초기화된다.
const MyState = ()=> {

   const [number, setNumber] = useState(1);
   let numberVar=1;

   const increaseCounterVar =()=>{
    numberVar = numberVar + 1;
    console.log("변수 =" + numberVar);
   }


  return (
    <div>
      <p>변수 : {numberVar}</p>
      <p>State : {number}</p>
      <button onClick={increaseCounterVar}>변수</button> 
      <button onClick={()=> {
        setNumber(number+1);
        console.log("State =" + number);
        }}>State</button>
    </div>
  )
}

const Say = () => {
 
  const [message, setMessage] = useState('');
  const [color,setColor] = useState('black');

  const onclickEnter =()=> {
    setMessage("안녕하세요");
  }

  const onclickLeave =()=> {
    setMessage("안녕히가세요");
  }

  return (
    <div>
      <button onClick={onclickEnter}>입장</button>
      <button onClick={onclickLeave}>퇴장</button>
      <h1 style={{color}}>{message}</h1>
      <button style={{color:'red'}} onClick={()=>setColor('red')}>빨간색</button>
      <button style={{color:'green'}} onClick={()=>setColor('green')}>초록색</button>
      <button style={{color:'blue'}} onClick={()=>setColor('blue')}>파랑색</button>
    </div>
  )
}

const EventPractice =() =>{
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const onChangeUsername = (e) =>{
    setUsername(e.target.value);
  }

  const onChangeMessage = (e) =>{
    setMessage(e.target.value);
  }

  const onClick = () =>{
    alert(username + ' : ' + message)
    setUsername('');
    setMessage('');
  }


  return (
    <div>
      <h2>이벤트 연습</h2>
      <input type="text" name = "username" value={username} placeholder='사용자명'
      onChange={onChangeUsername}/>
      <input type="text" name = "message" value = {message} placeholder='입력'
      onChange={onChangeMessage}/>
      <button onClick={onClick}>확인</button>
    </div>
  )
}


const IterationSample = () => {

  const [names, setNames] = useState([
    {id:1, text:'눈사람'},
    {id:2, text:'얼음'},
    {id:3, text:'눈'},
    {id:4, text:'바람'},
  ]);

  const [inputText, setInputText] = useState('');
  const [nextId, setNextId] = useState(5);

  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  }

  //map함수 : 자동으로 for문 돌려서 key와 값을 반환.
  //React에서는 반복을 통해서 엘레먼트를 출력할 경우 반드시 엘레먼트 속성에 키값이 있어야 함.
  const nameList = names.map((name)=> (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>{name.text}</li>
  ));

  const onChange = (e)=>{
    setInputText(e.target.value);
  }

  const onClick = () => {
    const nextNames = names.concat({
      id: nextId,
      text: inputText
    });
    setNextId(nextId + 1);
    setNames(nextNames);
    setInputText('');
  }

  return (
    <div>
      <h2>엘레멘트 반복 처리 예제</h2>
      {/* inputType State가 변경이 되면 렌더링이 일어남 */}
      <input type ='text' value={inputText} onChange={onChange} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </div>
  )

}

export default App;
