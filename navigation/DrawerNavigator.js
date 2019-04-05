import React from 'react';
import { Platform, Dimensions } from 'react-native';
import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import Recognize from '../src/camera.page';
import SettingsScreen from '../screens/SettingsScreen';
import Recommend from '../screens/Recommend';

import MenuDrawer from '../components/MenuDrawer';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<MenuDrawer navigation={navigation} />)
	}
}

const DrawerNavigator =  createDrawerNavigator(
	{
		Home: {
			screen: HomeScreen
		},
		Recognize: {
			screen: Recognize
		},
		Suggest: {
			screen: Recommend
		},
		Settings: {
			screen: SettingsScreen
		}
	},
	DrawerConfig
);

export default createAppContainer(DrawerNavigator);