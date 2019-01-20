import React from "react";

class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // setTimeout을 사용하여 다음 틱에서 popover를 안보이게 한다.
  // 이것은 필요하다 왜냐하면 우리는 먼저 체크해야 한다 만약 해당 요소의
  // 요소의 다른 자식 요소이 똑같이 포커스를 받는다.
  // 새로운 포커스 이번트 전에 블러가 발생한다.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // 자식 요소가 포커스를 받으면 팝업을 닫지 않는다.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // 리액트는 blur 및 focus 이벤트를 부모에게 버블링하여 도와준다.
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

export default BlurExample;
