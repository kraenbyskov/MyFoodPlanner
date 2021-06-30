import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function TopAppBar({ mainColor = 'black' }) {
	const navigation = useNavigation();
	return (
		<Appbar style={styles.Appbar}>
			{navigation.canGoBack() ? (
				<Appbar.Action
					icon={() => <MaterialCommunityIcons color={mainColor} name={'arrow-left-thick'} size={26} />}
					onPress={() => navigation.goBack()}
				/>
			) : null}
			<Appbar.Content title="" />
			{/* <Appbar.Action
				icon={({ color }) => <MaterialCommunityIcons name="account" color={mainColor} size={26} />}
				onPress={() => navigation.navigate('Profile')}
			/>
			<Appbar.Action color={mainColor} icon={MORE_ICON} onPress={() => {}} /> */}
		</Appbar>
	);
}

const styles = StyleSheet.create({
	Appbar: {
		backgroundColor: 'transparent',
		shadowOpacity: 0
		// alignItems: "flex-end",
	}
});
