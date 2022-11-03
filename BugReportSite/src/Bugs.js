import React, { useState } from "react"
import firebase from "firebase"
import { Table, Navbar, Nav, Button, Badge } from "react-bootstrap"
import { useCollectionData } from "react-firebase-hooks/firestore"

function Bugs() {
    const [GetData, setGetData] = useState([])
    const query = firebase.firestore().collection("Bugs").orderBy("Date", "desc")
    const [Food] = useCollectionData(query)

    React.useEffect(() => {
        setGetData(Food)
    }, [Food])

    return (
        <div className="App">
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Bugs</th>
                        <th>Title</th>
                        <th>Owner</th>
                        <th>Error Code</th>
                        <th>Link</th>
                    </tr>
                </thead>
                <tbody>
                    {GetData &&
                        GetData.map((bugs, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{bugs.Title}</td>
                                <td>{bugs.Owner}</td>
                                <td style={{ textAlign: "center" }}>
                                    <h5>
                                        <Badge size="lg" variant="primary">
                                            New
                                        </Badge>
                                    </h5>
                                </td>
                                <td>
                                    <Button size="sm" variant="primary">
                                        Link
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    )
}

export default Bugs
