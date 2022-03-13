import React, { FC } from 'react'
import { View, Text } from 'react-native'
import firebase from "firebase"
import { FeedCard, } from '../../components';
import { IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';

interface ProfileFeedInterface {
    navigation?: any
}

const ProfileFeed: FC<ProfileFeedInterface> = ({ navigation }) => {
    const [GetData, setGetData]: any = React.useState(null);




    const db = firebase
        .firestore()
        .collection("Allrecipes")
        .where("Owner.UserID", "==", firebase.auth().currentUser.uid);

    React.useEffect(() => {
        db.get().then((snapshot) => {
            const array = [];
            snapshot.forEach((doc) => {
                array.push(doc.data());
            });
            setGetData(array);
        });
    }, []);


    return (
        <View>
            <Text>Recipes</Text>
            <View style={{
                flex: 1,
                flexDirection: "row",
                width: "100%",
                flexWrap: "wrap"
            }}>
                {GetData &&
                    GetData.map((data, index) => (
                        <FeedCard key={index} navigation={navigation} data={data}>
                            <IconButton
                                color={theme.colors.primary}
                                size={25}
                                icon="check"
                            />
                        </FeedCard>
                    ))}
            </View>
        </View>
    )
}

export default ProfileFeed
