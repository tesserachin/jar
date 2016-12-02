'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 74,
    paddingLeft: 40,
    marginTop: 80
  },
  textPrompt: {
  	color: 'black',
  	fontSize: 30,
  	fontWeight: 'bold',
  	marginBottom: 20
  },
});

class MyHousePage extends Component {
	render() {
		console.log('rendering MyHousePage');
		return (
			<View style={styles.container}>
				<Text style={styles.textPrompt}>My House</Text>
			</View>
		);
	}
}

export default MyHousePage;