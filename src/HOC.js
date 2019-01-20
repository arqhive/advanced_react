import React from "react";

// Comment목록을 렌더링하기 위해 외부 데이터 소스가 필요한 컴포넌트가 있다고 가정
class CommentList extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      // DataSource는 글로벌한 데이터라고 가정한다.
      comments: DateSource.getCommnets()
    };
  }

  componentDidMount() {
    // Subscribe to changes
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    // Clean up listener
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      comments: DataSource.getComments()
    });
  }

  render() {
    return (
      <div>
        {this.state.comments.map(comment => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    );
  }
}

// 나중에 어떤 유사한 블로그 게시물을 작성하는 컴포넌트를 작성
class BlogPost extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      blogPost: DataSource.getBlogPost(props.id)
    };
  }

  componentDidMount() {
    DataSource.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    DataSource.removeChangeListener(this.handleChange);
  }

  handleChange() {
    this.setState({
      blogPost: DataSource.getBlogPost(this.props.id)
    });
  }

  render() {
    return <TextBlock text={this.state.blogPost} />;
  }
}

// 이 둘은 서로 다른 메소드를 호출하고 동일하지 않은 DateSource를 사용하고 다른 출력을 한다. 근데 구현 대부분은 비슷하다.

// 1. 마운트시에 DataSource 변경 리스너를 추가 했다.
// 2. 리스너 내부에서 데이터 소스가 변경될때마다 호출했다.
// 3. 마운트 해제시 리스너를 제거했다.

// 이 논리를 단일 장소에서 정의하고 여러 구성요소가 공유 할 수 있게 하는 추상화가 필요
// 그래서 HOC을 사용한다.

// 이런 식으로 함수를 호출해보자
// 첫 번째 매개변수는 래핑된 컴포넌트고, 두번째 요소는 데이터
const CommentListWithSubscription = withSubscription(CommentList, DataSource =>
  DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

// 이것이 HOC이다. 컴포넌트를 인자로 받아
function withSubscription(WrappedComponent, selectData) {
  // 다른 컴포넌트를 반환한다.
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ... that takes care of the subscription...
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // props 추가하기
      const injectedProp = someStateOrInstanceMethodl;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent
          data={this.state.data}
          injectedProp={injectedProp}
          {...this.props}
        />
      );
    }
  };
}
