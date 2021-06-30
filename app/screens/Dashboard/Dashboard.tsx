import React from 'react';
import { Text, View, StyleSheet, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { MainContainer, RecipeCard, AppBar } from '../../components';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { theme } from '../../core/theme';
import { addToCustomList } from '../../Redux/actions';
import { bindActionCreators } from 'redux';

const Dashboard = ({ currentUser, navigation, addToCustomList }) => {
	const [ GetData, setGetData ]: any = React.useState(null);
	const query = firebase
		.firestore()
		.collection('Allrecipes')
		.where('Owner.UserID', '==', firebase.auth().currentUser.uid)
		.limit(3);
	const [ Food ]: any = useCollectionData(query);
	React.useEffect(
		() => {
			setGetData(Food);
		},
		[ Food ]
	);
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View style={styles.TopDashboard}>
				<ImageBackground
					source={require('../../assets/background.jpg')}
					style={{ width: '100%', height: 330, top: -50, paddingTop: 100 }}
				>
					<AppBar mainColor="white" />
					<Text
						style={{
							fontSize: 40,
							fontFamily: 'Lato_900Black',
							color: 'white',
							textAlign: 'center'
						}}
					>
						Hej {currentUser && currentUser.name}!
					</Text>
				</ImageBackground>
			</View>
			<ScrollView
				style={{
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					top: -100,
					backgroundColor: theme.colors.background,
					padding: 20
				}}
			>
				<Text
					style={{
						marginBottom: 10,
						fontSize: 20,
						fontFamily: 'Lato_400Regular'
					}}
				>
					Nye Opskrifter
				</Text>
				{GetData &&
					GetData.map((data, index) => (
						<RecipeCard key={index} navigation={navigation} data={data}>
							<IconButton
								color={theme.colors.secondary}
								size={25}
								icon="folder"
								onPress={() => addToCustomList(data)}
							/>
						</RecipeCard>
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});

const mapDispatchProps = (dispatch) => bindActionCreators({ addToCustomList }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Dashboard);

const styles = StyleSheet.create({
	TopDashboard: {
		top: -50,
		backgroundColor: theme.colors.primary,
		height: 300
	},
	container: {
		flex: 1,
		padding: 20,
		width: '100%',
		// maxWidth: 340,
		alignSelf: 'center'
	},
	NonScroll: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});
