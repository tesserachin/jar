'use strict';

import React, { Component } from 'react'
import {
	Alert,
	Image,
	PickerIOS,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';

var PickerItemIOS = PickerIOS.Item;

import OverviewPage from '../pages/OverviewPage'

const hours = [0, 1, 2, 3, 4, 5]

var minutes = []

for (var i = 0; i <= 60; i++) {
	minutes.push(i);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		paddingTop: 74,
		marginTop: 80,
	},

	textPrompt: {
		color: 'black',
		fontSize: 30,
		fontWeight: '500',
		fontFamily: 'Avenir',
		marginBottom: 20,
		marginLeft: 40,
	},

	textInput: {
		height: 30,
		width: 300,
		fontSize: 20,
		fontFamily: 'Avenir',
	},

	nextButton: {
		backgroundColor: '#319bce',
		justifyContent: 'center',
		top: 50,
		marginBottom: 0,
		borderRadius: 10,
		minHeight: 50,
		minWidth: 50,
		height: 40,
		width: 100,
	},

	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		marginTop: 165,
		paddingBottom: 4,
		paddingLeft: 40,
	},

	backButton: {
		borderColor: '#319bce',
		borderWidth: 1,
		justifyContent: 'center',
		marginBottom: 0,
		borderRadius: 10,
		minHeight: 50,
		minWidth: 50,
		height: 40,
		width: 100,
		alignSelf: 'flex-start',
	},

	nextButton: {
		borderColor: '#319bce',
		borderWidth: 1,
		justifyContent: 'center',
		marginBottom: 0,
		borderRadius: 10,
		minHeight: 50,
		minWidth: 50,
		height: 40,
		width: 100,
		marginLeft: 95,
		alignSelf: 'flex-start',
	},

	buttonText: {
		color: '#319bce',
		alignSelf: 'center',
		fontSize: 25,
		marginTop: 9,
		fontFamily: 'Avenir'
	},

	hourPicker: {

	},

	minutePicker: {
	
	}
});

class Heading extends React.Component {
	render() {
		return (
			<View style={styles.headingContainer}>
				<Text style={styles.heading}>
					{this.props.label}
				</Text>
			</View>
		);
	}
}


class DurationPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			renderPlaceholderOnly: true,
			minutes: 0,
			date: this.props.date,
			timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
		};
	}

	onPressBack() {
		this.props.navigator.pop();
	}

	onPressNext() {
		this.props.currentTask.timeToComplete = this.state.minutes + ' min';

		this.props.navigator.push({
			title: 'Overview',
			component: OverviewPage,
			passProps: {addTask: this.props.addTask, currentTask: this.props.currentTask},
			leftButtonTitle: 'Cancel',
			onLeftButtonPress: () => this.props.navigator.popToTop(0)
		});

	}

	onDurationChange = (duration) => {
		this.setState({duration: duration});
	};

	render() {
		console.log('rendering DurationPage');
		return (
			<View style={styles.container}>
				<Text style={styles.textPrompt}>How long will it take?</Text>

				<PickerIOS
					style={styles.minutePicker}
					selectedValue={this.state.minutes}
					onValueChange={(minute) => this.setState({minutes: minute})}>
					{minutes.map((num) => (
						<PickerItemIOS
							key={num}
							value={num}
							label={"" + num + " min"}
						/>
					))}
				</PickerIOS>

				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.backButton} onPress={() => this.onPressBack()}>
						<Text style={styles.buttonText}>Back</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.nextButton} onPress={() => this.onPressNext()}>
						<Text style={styles.buttonText}>Next</Text>
					</TouchableOpacity>
				</View>				
			</View>
		);
	}
}

export default DurationPage;