import React from "react";
import CrudInput from "./CrudInput";
import CrudList from "./CrudList";

class CrudApp extends React.Component {
  state = {
      // 상태값(변수)을 정의한다.
      items: [
          {id:1, name: "슈퍼맨", power: 100},
          {id:2, name: "아쿠아맨", power: 300},
          {id:3, name: "스파이더맨", power: 500},
          {id:4, name: "배트맨", power: 30},
      ]
  }
  func = {
      /* 하위 컴포넌트로 전달할 콜백 메서드 정의 */
      doIns(newitem){
          debugger;
          const maxObj = this.state.items.reduce( function(prev, curt){
              return prev.id > curt.id ? prev: curt  // 최대값 id가 있는 객체
              return prev.id < curt.id ? prev: curt  // 최소값 id가 있는 객체
          })
          debugger;
          const newid  = maxObj.id + 1
          newitem.id = newid;

          // this.state.items.push(newitem);
          const newitems = [...this.state.items, newitem];

          this.setState({
              ...this.state,
              items: newitems
          })
      },
      doDel(index, item){
          const r = window.confirm("정말로 삭제하시겠습니까?");
          if(r === false) return;

          const newitems = this.state.items.filter( (element) => {
              return element.id !== item.id;
          });

          this.setState({
              ...this.state,
              items: newitems
          })

      },
      doUp(index, item){
          const newitems = this.state.items.map( (element) => {
              if(item.id === element.id) {
                  element.power = element.power + 100;
              }
              return element;
          });

          this.setState({
              ...this.state,
              items: newitems
          })
      },
      doDown(index, item){
          const newitems = this.state.items.map( (element) => {
              if(item.id === element.id) {
                  element.power = element.power - 50;
              }
              return element;
          });

          this.setState({
              ...this.state,
              items: newitems
          })
      },
      doSave(newitem){
          const newitems = this.state.items.map( (element) => {
              if(newitem.id === element.id) {
                  return newitem;
              }
              else {
                  return element;
              }
          });

          this.setState({
              ...this.state,
              items: newitems
          })
      },
  }
  constructor(props) {
      super()
      // this 바인딩. 예시) this.func.handler = this.func.handler.bind(this)
      // func 에 정의한 메서드는 반드시 this bind 처리해야 한다.
      this.func.doIns = this.func.doIns.bind(this);
      this.func.doDel = this.func.doDel.bind(this);
      this.func.doUp = this.func.doUp.bind(this);
      this.func.doDown = this.func.doDown.bind(this);
      this.func.doSave = this.func.doSave.bind(this);

      // ref 만들기. 예시) this.inputref = React.createRef()

  }
  handler = (event)=>{
      // 이벤트 핸들러는 화살표 함수로 만들면 this bind()를 생략해도 된다
      console.log(event.target)
  }
  render() { // JSX로 화면 만들기
      return (
          <div id="">
              <h1>Creat Read Update Delete</h1>
              <CrudInput {...this.props} {...this.state} {...this.func}></CrudInput>
              <hr/>
              <table>
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>POWER</th>
                          <th>CRUD</th>
                      </tr>
                  </thead>
                  <CrudList {...this.props} {...this.state} {...this.func}></CrudList>
              </table>
          </div>
      )
  }
};

export default CrudApp;