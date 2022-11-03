import React, { useState } from "react"

import firebase from "firebase"
import Bugs from "./Bugs"

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyD3LazlxdCrVt3qIuc7qxa7j0MTFvo-mjM",
        authDomain: "myfoodplanner-7f63b.firebaseapp.com",
        projectId: "myfoodplanner-7f63b",
        storageBucket: "myfoodplanner-7f63b.appspot.com",
        messagingSenderId: "986565033593",
        appId: "1:986565033593:web:215e0d9c0cae0a5e0d5ea8",
    }

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig)
    }
    return <Bugs />
}

export default App
