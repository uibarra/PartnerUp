import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';

export default class PartnerUp extends Component {
  render() {
    return (

    <View style={styles.backgroundcontainer}>
        <View style={styles.logocontainer}>
            <Image
                style={styles.logo}
                source={require('./partnerup.png')}
              />
              <Text style={styles.title}>Putting the party in study party.</Text>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundcontainer: {
        flex: 1,
        backgroundColor: '#fff'
  },
  logo: {
    width: 200,
    height: 200
  },
  logocontainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  title:{
    color: '#000000',
    marginTop: 10,
    width: 160,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'sans-serif-medium'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
});

AppRegistry.registerComponent('PartnerUp', () => PartnerUp);

