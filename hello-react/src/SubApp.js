import { Component } from "react";


class SubApp extends Component {
    render(){
      const name = '마지막';
      return (
        <div className = 'react'>
            <h1>이번 프로젝트는 {name} 프로젝트 입니다.</h1>
          </div>
       );

    }
}

export default SubApp;
