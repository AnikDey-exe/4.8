import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      url: "https://d486-2600-1700-3070-bc90-e47d-288c-f815-b122.ngrok.io/"
    };
  }

  componentDidMount() {
    this.getstars();
  }

  getstars = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        return this.setState({
          listData: response.data[0].data
        });
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => (
    <ListItem
      key={index}
      title={`Star : ${item.name}`}
      subtitle={`Distance: ${item.distance}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>{
        console.log(item.name)
        this.props.navigation.navigate("Details", { name: item.name })
      }
      }
    />
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text>Loading</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Stars World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988"
  },
  upperContainer: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  lowerContainer: {
    flex: 0.9
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda"
  }
});