import React from "react";

function App() {
  return (
    <div>
      <h2>Labeling</h2>
      <section>
        HTML form 컨트롤 시에는 접근 가능하게 라벨을 지정해야한다.
        <hr />
        <label htmlFor="namedInput">Name: </label>
        <input id="namedInput" type="text" name="name" />
      </section>
    </div>
  );
}

export default App;
