import React from "react";

// Context는 전역으로 간주 될 수 있는 데이터를 공유하도록 설계되었다.
// 기본값을 넣어줘야 한다.
const ThemeContext = React.createContext("light");

class MyContext extends React.Component {
  render() {
    return (
      // Provider를 이용해 현재 theme을 전달한다.
      // 어떤 컴포넌트라도 읽을수 있다, 얼마나 깊은지는 중요하지 않음
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

// class ThemedButton extends React.Component {
//   // 현재 theme 컨테스트를 읽도록 contextType을 지정한다.
//   // 리액트는 가장 가까운 Provider를 찾고 그 값을 사용한다.
//   // 혹은 propTypes 처럼 외부에 ThemedButton.contextType = ThemeContext;
//   static contextType = ThemeContext;
//   render() {
//     return <button theme={this.context}>Context Button</button>;
//   }
// }

// Consumer를 사용하는 방법
function ThemedButton() {
  return (
    <ThemeContext.Consumer>
      {value => <button theme={value}>Context Button</button>}
    </ThemeContext.Consumer>
  );
}

export default MyContext;
