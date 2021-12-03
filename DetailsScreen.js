import React, { Component } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import axios from "axios";
export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: "",
      url: `https://d486-2600-1700-3070-bc90-e47d-288c-f815-b122.ngrok.io/star?name=${this.props.navigation.getParam("name")}`
    };
    console.log(this.props.navigation.getParam("name"))
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then(response => {
        console.log(response.data)
        this.setDetails(response.data);
        console.log(response.data); 
      })
      .catch(error => {
        Alert.alert(error.message);
      });
  };

  setDetails = (starDetails) => {
    let imagePath = "";
    // switch (starType) {
    //   case "Gas Giant":
    //     imagePath = require("../assets/star_type/gas_giant.png");
    //     break;
    //   case "Terrestrial":
    //     imagePath = require("../assets/star_type/terrestrial.png");
    //     break;
    //   case "Super Earth":
    //     imagePath = require("../assets/star_type/super_earth.png");
    //     break;
    //   case "Neptune Like":
    //     imagePath = require("../assets/star_type/neptune_like.png");
    //     break;
    //   default:
    //     imagePath = require("../assets/star_type/gas_giant.png");
    // }

    this.setState({
      details: starDetails,
    //   imagePath: imagePath
    });
  };

  render() {
    const { details, imagePath } = this.state;
      return (
        <View style={styles.container}>
          <Card
            title={details.name}
            image={imagePath}
            imageProps={{ resizeMode: "contain", width: "100%" }}
          >
            <View>
              <Text
                style={styles.cardItem}
              >{`Mass: ${details.mass}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Radius: ${details.radius}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Gravity : ${details.gravity}`}</Text>
              <Text
                style={styles.cardItem}
              >{`Distance: ${details.distance}`}</Text>
            </View>
            {/* <View style={[styles.cardItem, { flexDirection: "column" }]}>
              <Text>{details.specifications ? `Specifications : ` : ""}</Text>
              {details.specifications.map((item, index) => (
                <Text key={index.toString()} style={{ marginLeft: 50 }}>
                  {item}
                </Text>
              ))}
            </View> */}
          </Card>
        </View>
      );
    
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardItem: {
    marginBottom: 10
  }
});