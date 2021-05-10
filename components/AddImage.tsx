import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Appbar, IconButton } from 'react-native-paper';
import { theme } from '../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CameraActions = ({ Icon, PressFunction, disabled = false }) => {
	return (
		<Appbar.Action
			style={{ flex: 1 }}
			icon={() => <MaterialCommunityIcons name={Icon} color={'white'} size={26} />}
			disabled={disabled}
			onPress={PressFunction}
		/>
	);
};

export default function AddImage({ navigation }) {
	const [ hasGalleryPermission, setHasGalleryPermission ] = useState(null);
	const [ hasCameraPermission, setHasCameraPermission ] = useState(null);
	const [ camera, setCamera ] = useState(null);
	const [ image, setImage ] = useState(null);
	const [ type, setType ] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const cameraStatus = await Camera.requestPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === 'granted');
			const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasGalleryPermission(galleryStatus.status === 'granted');
		})();
	}, []);

	const takePicture = async () => {
		if (camera) {
			const options = { quality: 0.1, base64: true };
			const data = await camera.takePictureAsync(options);
			setImage(data.uri);
		}
	};

	const retakePicture = () => {
		setImage(null);
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [ 1, 1 ],
			quality: 1
		});

		console.log(result);

		if (!result.cancelled) {
			// @ts-ignore
			setImage(result.uri);
		}
	};

	if (hasCameraPermission === null || hasGalleryPermission === false) {
		return <View />;
	}
	if (hasCameraPermission === false || hasGalleryPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<SafeAreaView style={styles.container}>
			<Appbar style={styles.Appbar}>
				<Appbar.Action
					icon={() => <MaterialCommunityIcons name={'arrow-left-thick'} color={'white'} size={26} />}
					onPress={() => navigation.goBack()}
				/>
				<CameraActions
					Icon={'camera-retake'}
					PressFunction={() => {
						setType(
							type === Camera.Constants.Type.back
								? Camera.Constants.Type.front
								: Camera.Constants.Type.back
						);
					}}
				/>
				<CameraActions Icon={'folder-image'} PressFunction={() => pickImage()} />

				<CameraActions
					disabled={image ? false : true}
					Icon={'plus-box'}
					PressFunction={() => navigation.navigate('AddRecipe', { image })}
				/>
			</Appbar>
			{!image ? (
				<View style={styles.cameraContainer}>
					<Camera ref={(ref) => setCamera(ref)} style={styles.camera} ratio={'1:1'} type={type} />
				</View>
			) : (
				<View style={styles.cameraContainer}>
					<Image
						source={{ uri: image }}
						style={{
							flex: 1,
							aspectRatio: 1 / 1
						}}
					/>
				</View>
			)}

			<View
				style={{
					alignItems: 'center',
					flex: 1,
					justifyContent: 'center'
				}}
			>
				{!image ? (
					<IconButton
						icon={() => <MaterialCommunityIcons name={'circle-double'} color={'white'} size={100} />}
						color={'white'}
						size={100}
						onPress={() => takePicture()}
					/>
				) : (
					<IconButton
						icon={() => (
							<MaterialCommunityIcons name={'camera-retake-outline'} color={'white'} size={100} />
						)}
						color={'white'}
						size={100}
						onPress={() => retakePicture()}
					/>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black'
	},
	Appbar: {
		backgroundColor: theme.colors.primary,
		shadowOpacity: 0
	},
	takePictureButton: {},
	camera: {
		flex: 1,
		aspectRatio: 1
	},
	cameraContainer: {
		flex: 1,
		flexDirection: 'row'
	}
});
