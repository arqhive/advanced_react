import React from "react";

class MyErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // state를 업데이트하여 다음 렌더링에 대체UI가 표시되게 한다.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 서비스에 오류를 기록할수도 있다.
    // logerrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // 어떤 fallbackUI도 사용 할 수 있다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default MyErrorBoundary;
