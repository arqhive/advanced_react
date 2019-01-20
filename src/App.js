import React from "react";
import OuterClickExample from "./OuterClickExample";
import BlurExample from "./BlurExample";

/* React 에서 Focus를 설정하는법 */
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // ref를 만든다
    this.textInput = React.createRef();
  }

  componentDidMount() {
    // 컴포넌트가 마운트 되면 포커스
    this.textInput.current.focus();
  }

  render() {
    return <input type="text" ref={this.textInput} />;
  }
}

function App() {
  return (
    <div>
      <h2>Labeling</h2>
      <section>
        HTML form 컨트롤 시에는 접근 가능하게 라벨을 지정해야한다.
        <br />
        <label htmlFor="namedInput">Name: </label>
        <input id="namedInput" type="text" name="name" />
      </section>
      <hr />

      <h2>Focus</h2>
      <section>
        <CustomTextInput />
      </section>
      <hr />

      <h2>외부 클릭 이벤트</h2>
      <p>키보드 만으로는 이 이벤트를 달성하기 힘들다</p>
      <section>
        <OuterClickExample />
      </section>
      <hr />

      <h2>키보드로도 가능한 이벤트</h2>
      <section>
        <BlurExample />
      </section>
    </div>
  );
}

export default App;
