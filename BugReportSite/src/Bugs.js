import React, { useState } from "react"
import firebase from 'firebase';

import { useCollectionData } from 'react-firebase-hooks/firestore';


function Bugs() {
    const [GetData, setGetData] = useState([]);
    const query = firebase
        .firestore()
        .collection('Bugs')
        .orderBy('Date', "desc");
    const [Food] = useCollectionData(query);

    React.useEffect(
        () => {
            setGetData(Food);
        },
        [Food]
    );



    return (
        <div className="App">
            <h1>Bugs</h1>
            <ul>
                {GetData && GetData.map((bugs) => (
                    <li>
                        <h2>Title : {bugs.Title}</h2>
                        <h4>Owner : {bugs.Owner}</h4>
                        <p>Description : {bugs.Description}</p>
                        <img style={{ width: 200 }} src={bugs.downloadUrl} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Bugs
