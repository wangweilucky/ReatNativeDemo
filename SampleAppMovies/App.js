import React, { Component } from "react";

import { Image, FlatList, StyleSheet, Text, View } from "react-native";

const REQUEST_URL =
  "https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json";

export default class SampleAppMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        //  每次调用setState时，组件会重新执行 render 方法重新渲染
        this.setState({
          data: this.state.data.concat(responseData.movies),
          loaded: true
        });
      });
  }

  render() {
    
    if (!this.state.loaded) {
      return this.renderLoadingView();
    } else {
      return (
        <FlatList
          data={this.state.data}
          renderItem={this.renderMovie}
          style={styles.list}
          keyExtractor={item => item.id}
        />
      );
    }
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>Loading movies...</Text>
      </View>
    );
  }

  renderMovie({ item }) {
    // { item }是一种“解构”写法，请阅读ES2015语法的相关文档
    // item也是FlatList中固定的参数名，请阅读FlatList的相关文档
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: item.posters.thumbnail }}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{item.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center"
  },
  year: {
    textAlign: "center"
  },
  thumbnail: {
    width: 53,
    height: 81
  },
  list: {
    paddingTop: 20,
    backgroundColor: "#F5FCFF"
  }
});