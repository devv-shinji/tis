import React from "react";
import CrudListItem from "./CrudListItem";

class CrudList extends React.Component {
  state = {
      // 상태값(변수)을 정의한다.
  }
  func = {
      // func에 정의된 메서드는 반드시 constructor에서 this를 bind() 처리해야 한다.
      // func에는 자식 컴포넌트에 넘길 메서드만 작성한다.
      // 왜 자식에게 부모 메서드를 넘기나? 부모의 상태값을 변경하기 위해서.
  }
  constructor(props) {
      super()
      // this 바인딩. 예시) this.func.handler = this.func.handler.bind(this)
      // func 에 정의한 메서드는 반드시 this bind 처리해야 한다.

      // ref 만들기. 예시) this.inputref = React.createRef()

  }
  render() { // JSX로 화면 만들기
      const {items} = this.props;
      const arrs = items.map( (item, index, items) => {
          return (
              <CrudListItem {...this.props} item={item} key={index}></CrudListItem>
          )
      });

      return (
          <tbody>
              {arrs}
          </tbody>
      )
  }
};



export default CrudList;