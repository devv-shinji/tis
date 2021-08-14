import React from "react";

class CrudListItem extends React.Component {
  state = {
      // 상태값(변수)을 정의한다.
      isEditMode: false
  }
  constructor(props) {
      super()
      this.refInputName = React.createRef();
      this.refInputPower = React.createRef();
  }
  doDel = (event)=>{
      const {index, item} = this.props;
      this.props.doDel(index, item);
  }
  doUp = (event)=>{
      const {index, item} = this.props;
      this.props.doUp(index, item);
  }
  doDown = (event)=>{
      const {index, item} = this.props;
      this.props.doDown(index, item);
  }
  doEdit = (event)=>{
      // this.state.isEditMode = !this.state.isEditMode;
      this.setState({
          ...this.state,
          isEditMode: !this.state.isEditMode
      })
  }
  doSave = (event) => {
      const {item} = this.props;

      // 유효성 검사
      if(this.refInputName.current.value.trim() === '') {
          alert('이름을 입력하세요');
          this.refInputName.current.focus();
          event.preventDefault();
          event.stopPropagation();
          return false;
      }
      if(this.refInputPower.current.value.trim() === '') {
          alert('파워를 입력하세요');
          this.refInputPower.current.focus();
          event.preventDefault();
          event.stopPropagation();
          return false;
      }
      if( isNaN(Number(this.refInputPower.current.value)) ) {
          alert('파워에 숫자를 입력하세요');
          this.refInputPower.current.value="";
          this.refInputPower.current.focus();
          event.preventDefault();
          event.stopPropagation();
          return false;
      }

      const newitem = {
          id: item.id,
          name: this.refInputName.current.value,
          power: Number(this.refInputPower.current.value)
      }
      this.props.doSave(newitem);
      this.setState({
          ...this.state,
          isEditMode: !this.state.isEditMode
      })
  }
  render() { // JSX로 화면 만들기
      const {index, item} = this.props;
      // item.power >= 100 이면 strong이 아니면 ""이 되게
      const strong = item.power >= 300 ? "strong" : "";
      // let strong = "";
      // if(item.power >= 300) {
      //     strong = "strong";
      // }
      const formView = (
          <tr className={strong}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.power}</td>
              <td>
                  <button onClick={this.doDel}>Del</button>
                  <button onClick={this.doUp}>Power Up</button>
                  <button onClick={this.doDown}>Power Down</button>
                  <button onClick={this.doEdit}>Edit</button>
              </td>
          </tr>
      )
      const formEdit = (
          <tr className={strong}>
              <td>{item.id}</td>
              <td>
                  <input type="text"
                      name="name"
                      placeholder="이름을 입력하세요"
                      defaultValue={item.name}
                      ref={this.refInputName}
                  />
              </td>
              <td>
                  <input type="number"
                      name="power"
                      placeholder="파워를 입력하세요"
                      defaultValue={item.power}
                      ref={this.refInputPower}
                  />
              </td>
              <td>
                  <button onClick={this.doDel}>Del</button>
                  <button onClick={this.doUp}>Power Up</button>
                  <button onClick={this.doDown}>Power Down</button>
                  <button onClick={this.doSave}>Save</button>
              </td>
          </tr>
      )

      if( this.state.isEditMode)
          return formEdit;
      else
          return formView;
  }
};


export default CrudListItem;