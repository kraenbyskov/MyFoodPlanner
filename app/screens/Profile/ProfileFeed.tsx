import React, { FC } from 'react'
import { View, Text } from 'react-native'
import firebase from "firebase"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FeedCard, } from '../../components';
import { IconButton } from 'react-native-paper';
import { theme } from '../../core/theme';

interface ProfileFeedInterface {
    navigation?: any
}

const ProfileFeed: FC<ProfileFeedInterface> = ({ navigation }) => {
    const [GetData, setGetData]: any = React.useState(null);


    const query = firebase
        .firestore()
        .collection("Allrecipes")
        .where(
            "Owner.UserID",
            "==",
            firebase.auth().currentUser.uid
        );
    const [Food]: any = useCollectionData(query);

    React.useEffect(() => {
        setGetData(Food);
    }, [Food]);

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
                                color={theme.colors.secondary}
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
