import React, { useEffect, FC } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, clearData } from '../Redux/actions/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { theme } from '../core/theme';

import DasbhoardScreen from './Dashboard/Dashboard';
import RecipesScreen from './Recipes/Recipes';
import CustomListScreen from './CustomList/CustomList';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();

interface EmptyScreeenInterface {}

const EmptyScreen: FC<EmptyScreeenInterface> = () => {
	return <View />;
};

const Main = (props) => {
	useEffect(() => {
		props.clearData();
		props.fetchUser();
	}, []);

	return (
		<Tab.Navigator>
			<Tab.Screen
				name="Dasbhoard"
				component={DasbhoardScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />
				}}
			/>
			<Tab.Screen
				name="CustomList"
				component={CustomListScreen}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-check" color={color} size={26} />
				}}
			/>

			<Tab.Screen
				name="Recipes"
				component={RecipesScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="format-list-checkbox" color={color} size={26} />
					)
				}}
			/>

			<Tab.Screen
				name="AddContainer"
				component={EmptyScreen}
				listeners={({ navigation }) => ({
					tabPress: (event) => {
						event.preventDefault();
						navigation.navigate('AddRecipe');
					}
				})}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="camera" color={color} size={26} />
				}}
			/>
		</Tab.Navigator>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser, clearData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
