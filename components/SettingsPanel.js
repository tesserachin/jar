import React from 'react';
import {
	Dimensions,
	StyleSheet,
	ScrollView,
	View,
	Image,
	Text,
	TouchableOpacity,
	ListView,
	NavigatorIOS,
} from 'react-native';

import JarPage from '../pages/JarPage.js'
import CreatePage from '../pages/CreatePage'

const { Component } = React;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
	menu: {
		flex: 1,
		width: window.width,
		height: window.height,
		backgroundColor: 'white',
	},
	avatarContainer: {
		backgroundColor: '#319bce',
		width: window.width,
		height: 170,
	},
	avatar: {
		marginLeft: 20,
		marginTop: 35,
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	name: {
		fontSize: 20,
		position: 'absolute',
		left: 160,
		top: 70,
	},
	list: {
		zIndex: -100,
	},
	row: {
		width: window.width,
		height: 60,
	},
	optionTitle: {
		color: '#319bce',
		fontSize: 20,
		fontWeight: '300',
		position: 'absolute',
		left: 85,
		top: 19,
	},
	image: {
		marginLeft: 15,
		width: 40,
		height: 40,
		top: 10,
	},
	separator: {
	  	flex: 1,
	    height: 1,
	    backgroundColor: '#8E8E8E',
	    padding: 0
	},
});

var options = [
	{
		name: 'My House',
		image: require('../assets/myhouse_icon.png'),
	},
	{
		name: 'Profile',
		image: require('../assets/profile_icon.png'),
	},
	{
		name: 'Bank Account',
		image: require('../assets/bankaccount_icon.png'),
	},
	{
		name: 'Settings',
		image: require('../assets/settings_icon.png'),
	},
	{
		name: 'Logout',
		image: require('../assets/logout_icon.png'),
	},
];

class SettingsPanel extends Component {
	constructor(props) {
		super(props);

		this.list = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: this.list.cloneWithRows(options),
		};
	}

	// no idea what this variable is for. everything seems to work fine without it, but
	// I'm leaving it here just in case.

	// static propTypes = {
	// 	onItemSelected: React.PropTypes.func.isRequired,
	// };

	/* Use the name of the selected option to determine which page to display next */
	fetchOption = (dataName) => {
		var nextComponent;

		switch(dataName) {
			case 'My House':
				nextComponent = JarPage;
				break;
			case 'Profile':
				nextComponent = JarPage;
				break;
			case 'Bank Account':
				nextComponent = JarPage;
				break;
			case 'Settings':
				nextComponent = CreatePage;
				break;
			case 'Logout':
				nextComponent = CreatePage;
				break;
			default:
				nextComponent = TasksPage;
		}
		return {
			title: dataName,
			component: nextComponent,
		};
	}

	/* When an option is pressed, navigate to the proper page */
	onOptionPressed = (data) => {
		this.props.navigator.push(this.fetchOption(data.name));
		// close the settings menu
		this.props.toggle(); // OR:
		// this.props.updateMenuState(this.props.isOpen);
	}

	/* Grab the proper icon to display, based on the image stored in data */
	renderIcon = (data) => {
		return (
			<Image source={ data.image } style={styles.image} />
		);
	}

	/* Render each row according to the data point (coming from the variable called 'options') */
	renderRow = (data) => {
		return (
			<TouchableOpacity onPress={() => this.onOptionPressed(data)}>
			  	<View style={styles.row}>
			  		{this.renderIcon(data)}
			    	<Text style={styles.optionTitle}>{data.name}</Text>
			  	</View>
			</TouchableOpacity>
		);
	}

	/* Render everything in the SettingsPanel. */
	render() {
		console.log('rendering SettingsPanel');
		return (
			<ScrollView scrollsToTop={false} style={styles.menu}>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={{ uri: this.props.user.picURL }} />
					<Text style={styles.name}>
						{this.props.user.firstname}{'\n'}
						{this.props.user.lastname}
					</Text>
				</View>

				<View style={styles.separator} />
				<ListView
					style={styles.list}
					dataSource={this.state.dataSource}
					renderRow={this.renderRow}
					renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} /> }
				/>
			</ScrollView>
		);
	}
};

export default SettingsPanel;