import './App.css';
import './exam.css';
import {useState,useEffect,useRef,useContext, useMemo,useCallback} from 'react';
import {createContext} from 'react';

//1. useState
//2. useEffect : 어떠한 컴포넌트가 마운트(화면에 첫렌더링), 업데이트(재렌더링), 언마운트(화면에서 사라질 때) 될 때 
//  특정한 코드를 처리해주는 함수. 
//3. useRef : Ref Object를 리턴하는 Hook 함수. 리턴된 Ref값은 컴포넌트의 전 생애 기간 동안 값이 유지됨. 새로 렌더링 되더라도 값이 보존.
// 예) const ref = useRef(value) --> Ref Object {current:value} 리턴되며, ref.current = 'hello'와 같은 방법으로 값을 바꿀 수 있음.
//  state의 변화 ==> 렌더링 --> 컴포넌트 내부 변수들을 초기화 시킴. 반면에 Ref의 변화 --> No 렌더링 --> 값이 유지.
// 따라서, 렌더링이 되더라도 초기화하면 안되는 값을 저장할 때 유용.
// DOM요소에 접근할 때 엘레먼트 내에 ref 속성을 만들고, 이 ref 속성 값을 이용해서 엘레먼트에 접근이 가능.
//4. useContext : Redux 또는 Redux Toolkit이 많이 사용됨. 데이터 공유 함수. 데이터 공유 함수. Context로 공유한 데이터를 받아 오는 역할을 하는 함수.
//5. useMemo : Memoization (반복된 계산을 매번 다시 수행하는 것이 아니라 캐싱해놓은 결과를 불러내어서 재사용하는 최적화 기법) 기능을 수행. 
//  useMemo 함수의 2번째 인자인 의존성배열(dependency array)의 값이 변경될 때만 첫번째 인자인 콜백함수를 실행시키고, 
//  실행이 안되었을 경우는 기존 보관 중인 "값"을 리턴
//  useEffect 함수의 2번째 인자에 객체가 있는 경우에 발생하는 문제를 useMemo 함수는 해결할 방법이 있기 때문에 
//  useEffect 함수를 대신해서 사용되는 경우가 있음.
//6. useCallback : useMemo 처럼 Memoization 기능을 수행하는 함수로 useMemo가 콜백함수의 리턴값을 Memoization하는 것과 달리
//  콜백함수 자체를 Memoization 함. 

const App = () => {
  return (
    <div className='exam'>
      <h1>useState 예제</h1>
      <Exam1/>
      <Exam2/>
      <h1>useEffect 예제</h1>
      <Exam3/>
      <Exam4/>
      <h1>useRef 예제</h1>
      <Exam5/>
      <hr></hr>
      <Exam6/>
      <h1>useContext 예제</h1>
      <Exam7/>
      <h1>useMemo 예제</h1>
      <Exam8/>
      <Exam9/>
      <CopyText/>
      <h1>useCallback 예제</h1>
      <Exam10/>
      <Exam11/>
    </div>
  )
}

//useState 예제

const Exam1 = () => {
  const [time, setTime] = useState(1);
  const handleClick = () => {
    let newTime;
    if(time>=12){
      newTime=1;
    }
    else newTime =time + 1;
    setTime(newTime);
  }
  return (
    <div>
      <span>현재 시간 : {time} 시</span>
      <button onClick={handleClick}>시간 변경</button>
    </div>
  )
}

const Exam2 = () => {
  const [names,setNames] = useState(['김철수','김민수']);
  const [input,setInput] = useState('');
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }; 
  const handleClick = () => { //불변성, 전개 연산자(spread 연산자)
    setNames((prevState) => {return [input,...prevState]});// 문법 
  };

  return(
    <div>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={handleClick}>클릭</button>
      {/* map함수는 자동으로 for문을 실행시켜서 인덱스와 값을 인자로 받아 옴 */}
      {names.map((name,idx)=> {
        return <p key={idx}>{name}</p>
      })}
    </div>
  )

}

// useEffect 예제
const Exam3 = () =>{
  const [count,setCount] = useState(1);
  const [name,setName] = useState('');
  
  const handleCountClick = () => {
    setCount(count + 1);
  }

  const handleInputChange = (e) => {
    setName(e.target.value);
  }

  //매번 렌더링이 될 때마다 콜백함수가 실행.
  useEffect(()=>{console.log('1.렌더링 발생 시 마다 콜백 함수 실행')});

  //의존성 배열 (Dependency Array)
  //마운트(첫번째 렌더링이 일어날 때만 실행)
  useEffect(()=>{console.log('2.마운트 시에만 콜백 함수 실행')},[]);

  //마운트(첫번째 렌더링)와 count값이 변경될때만 콜백함수가 실행
  useEffect(()=>{console.log('3.마운트와 count값이 바뀔때만 콜백 함수 실행')},[count]);

  return (
    <div>
      <button onClick={handleCountClick}>클릭</button>
      <span> count: {count}</span>
      <input type="text" value={name} onChange={handleInputChange} /> <br></br>
      <span>name:{name}</span>
    </div>
  )
}

//CleanUp 예제
const Exam4 = () => {
  const [showTimer,setShowTimer] = useState(false);
  let btn_name;
  if(showTimer) btn_name = "타이머 중지";
    else btn_name = "타이머 시작";
  return (
    <div>
      {showTimer && <Timer />} {/* showTimer가 true일 때 <Timer />를 실행 */}
      <button onClick={()=> {setShowTimer(!showTimer)}}>{btn_name}</button>
    </div>
  )
}

const Timer = () =>{
  useEffect(()=>{
    const timer = setInterval(()=>{
      console.log("타이머 돌아가는 중");
    },1000);
    return () => {
      clearInterval(timer);
      console.log("타이머가 종료되었습니다.");
    }
  },[]);
  return (
    <div>
      <span>타이머를 시작합니다. 콘솔을 보세요.</span>
    </div>
  )
}

//useRef 예제

const Exam5 = () => {
  const [count,setCount] = useState(1);
  const countRef = useRef(1); //countRef가 {current:1} 객체를 참조.
  const renderCount = useRef(1);
  
  let countVar = 0;

  const increaseCountState = () => {
    setCount(count + 1);
  }
  const increaseCountVar = () => {
    countVar= countVar +1;
    console.log("Var ="+ countVar );
  }
    
  const increaseCountRef = () => {
    countRef.current = countRef.current + 1;
    console.log("Ref ="+ countRef.current);

  }

  useEffect(()=>{ //React는 처음 렌더링 할때는 검사를 위해 두번 렌더링을 함.
    renderCount.current = renderCount.current + 1;
    console.log("Exam5 예제" + renderCount.current + "번째 렌더링");

  })
  return (
    <div>
      <p>State : {count}</p>
      <p>Ref : {countRef.current}</p>
      <p>Var : {countVar}</p>
      <button onClick={increaseCountState}>State 증가</button>
      <button onClick={increaseCountRef}>Ref 증가</button>
      <button onClick={increaseCountVar}>Var 증가</button>
    </div>
  )
}

const Exam6 = () => {
  const inputRef = useRef();

  useEffect(()=>{
    inputRef.current.focus();
  },[]);

  const login = () => {
    alert(`안녕하세요! ${inputRef.current.value}님`); // 템플리트 표현법 
    inputRef.current.focus();
  }
  return (
    <div>
      <input type="text" ref={inputRef} placeholder='이름을 입력하세요.'/>
      <button onClick={login}>로그인</button>
    </div>
  )
}

// useContext 예제
const Exam7 = () => {
  const [isDark, setIsDark] = useState(false);
  return(
    <div>
      <UserContext.Provider value={'김상경'}> {/* provider*/}
        <ThemeContext.Provider value={{isDark, setIsDark}}>
        <Page />
        </ThemeContext.Provider>
      </UserContext.Provider>
    </div>
  )
}

const ThemeContext = createContext(null); //저장소 생성
const UserContext = createContext(null); //저장소 생성

const Page = ({isDark, setIsDark}) => {

  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  )
}

const Header = () => {
  const {isDark} = useContext(ThemeContext); //저장소에 보관된 값을 가져옴.
  const user = useContext(UserContext); //저장소에 보관된 값을 가져옴.
  return (
    <div>
      <header className='header'
        style = {{
          backgroundColor: isDark ? 'black':'lightgray',
          color:isDark ? 'white' : 'black',
        }}>
          <h1>어서 오세요. {user}님 !!!</h1>
        </header>
    </div>
  )
}

const Content = () => {
  const {isDark} = useContext(ThemeContext);
  const user =useContext(UserContext);
  return (
    <div className='content'
      style = {{
        backgroundColor:isDark ? 'black': 'white',
        color:isDark ? 'white': 'black'
      }}
      ><p>{user}님, 좋은 하루 되세요</p>
    </div>
  );
}

const Footer = () => {
  const {isDark,setIsDark} = useContext(ThemeContext);
  return (
    <div>
      <footer className='footer'
      style={{
        backgroundColor: isDark ? 'black' : 'lightgray'
      }}>
        <button className='button' onClick={() => setIsDark(!isDark)}>DarkMode</button>
      </footer>
    </div>
  )
}

//useMemo 예제
const Exam8 = () => {
  const [hardNumber,setHardNumber] = useState(1);
  const [easyNumber,setEasyNumber] = useState(1);

 // const hardSum = hardCalculate(hardNumber);
  const hardSum = useMemo(()=>{
    return hardCalculate(hardNumber);
  },[hardNumber]);
  //hardNum이 변경될때만 콜백함수가 실행. 변경이 일어나지 않으면 그 전에 가지고 있던 hardSum 값을 재사용.
  const easySum = easyCalculate(easyNumber);
  
  return (
    <div>
      <h1>짜증나는 계산기</h1>
      <input type="number" value={hardNumber}
         onChange={(e) => setHardNumber(parseInt(e.target.value))} />
      <span>+ 10,000 = {hardSum}</span>

      <h1>조금 덜 짜증나는 계산기</h1>
      <input type="number" value ={easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))} />
        <span>+ 10,000 = {easySum}</span>
    </div>
  )
}

const hardCalculate = (number) => {
  console.log("짜증나는 계산기 렌더링");
  for(let i =0; i<999999999;i++){}
    return number + 10000;
}

const easyCalculate = (number) => {
  console.log("조금 덜 짜증나는 렌더링");
  return number + 10000;
}

const Exam9 = () => {
  const [number, setNumber] = useState(0);
  const [isKorea,setIsKorea] = useState(true);
  //const location = isKorea ? '한국' : '외국';
  const location = useMemo(()=>{ return{
    country : isKorea ? '한국' : '외국'
    } //primitive type(원시형, 일반형)이 아닌 reference type의 경우 
}, [isKorea]);

 // useEffect(()=> {console.log("useEffect 호출")},[location]); //location이 바뀔 때에만 값이 바뀌도록 함.

  return (
    <div>
      <h1>하루에 몇끼 먹어요?</h1>
      <input type = "number" value ={number} onChange={(e) => setNumber(e.target.value)} />
      <hr/>
      <h1>어느 나라에 있나요?</h1>
      <p>나라 : {location.country}</p>
      <button onClick={()=> setIsKorea(!isKorea)}>비행기 타자... </button>
    </div>
  )
}

//얇은 복사, 깊은 복사 설명 
const CopyText = () => {

  const object = {
    name: "김민수",
    gender: "male"

  }

  const copy ={...object}; //얇은 복사(Shallow Copy)
  //const copy = Object.assign({}, object);
  console.log(object === copy); //false
  copy.gender = "female";
  console.log('copy',copy); //값이 다르게 나옴. 서로 다른 주소를 가지고 있음. 불변성을 유지한다. 
  console.log('object', object);

  const object1 = {
    name : "김철수",
    gender : "female"
  };

  const copy1 = object1; //깊은 복사(Deep Copy)
  console.log(object1 === copy1); //true
  copy1.gender = "male";
  console.log('copy1', copy1); //값이 둘 다 바뀜, 동일한 주소를 공유하기 때문임. 불변성을 유지하지 못하는 것임.
  console.log('object1', object1);

}

//useCallback 예제 

const Exam10 = () => {
  const [number,setNumber] = useState(0);
  
  const someFunction = useCallback(()=>{
    console.log(`someFunc : number : ${number}`);
    return;
  }, [number]); //Template 표기법
    
  useEffect(()=> {console.log("someFunc가 변경되었습니다.");},
      [someFunction]); //첫번째 + someFuncion이 변경

  return (
    <div>
      <input type="number" value={number} onChange={(e)=>setNumber(e.target.value)} />
      <br />
      <button onClick={someFunction}>Call someFunc</button>
    </div>
  )
}

const Exam11 = () => {
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  const createBoxStyle = useCallback(() => {
  return {
    backgroundColor: 'red',
    width: `${size}px`,
    height: `${size}px`
  }
},[size]);

  return (
    <div style={{background:isDark?'black':'white'}}>
      <input type='number' value={size} onChange={(e)=> setSize(e.target.value)} />
      <button onClick={()=> setIsDark(!isDark)}>Change Theme</button>
      <Box createBoxStyle={createBoxStyle}/>
    </div>
  )
} 

const Box = ({createBoxStyle}) => {
  const [style, setStyle] = useState({});

  useEffect(()=> {
    console.log("박스 사이즈 확장");
    setStyle(createBoxStyle())
  },[createBoxStyle])

  return (
    <div style={style}>

    </div>
  )
}

export default App;