import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header'

const ListLocation = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [locations, setLocations] = React.useState([]);
    console.log("🚀 ~ file: ListLocation.js:9 ~ ListLocation ~ locations:", locations)
    const navigate = useNavigate();

    useEffect(() => {
        const getAllLocations = async () => {
            await axios.get(`http://localhost:5000/api/location/`).then((res) => {
                setLocations(res.data.data);
                console.log("🚀 ~ file: ListLocation.js:16 ~ awaitaxios.get ~ res:", res)
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getAllLocations();
    }, [])



    // const locations = [
    //     {
    //         _id: "641215951c8a383d9ca4cc04",
    //         name: "bandarawela",
    //         address: "bandarawela",
    //         phone: "077547272",
    //         devices: [
    //             "kiosk"
    //         ],

    //     },
    //     {
    //         _id: "6412181f12c4eb2af15944a7",
    //         name: "bandarawela update",
    //         address: "bandarawela update",
    //         phone: "077547272",
    //         devices: [
    //             "111",
    //             "222",
    //             "333"
    //         ],

    //     },
    //     {
    //         _id: "6412bdf347347f6c7d380844",
    //         name: "badulla",
    //         address: "badulla",
    //         phone: "077547272",
    //         devices: [
    //             "B",
    //             "c",
    //             "kiosk"
    //         ],

    //     },
    //     {
    //         _id: "6413f9046ea888e4852dee2f",
    //         name: "kurunagala",
    //         address: "kurunagala",
    //         phone: "077547272",
    //         devices: [],

    //     }
    // ];

    const filteredLocations = locations.filter((locations) => {
        return (
            locations.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            locations.address.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            locations.phone.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });

    const onClickEdite = (EID) => {
        console.log("🚀 ~ file: ListLocation.js:62 ~ onClickEdite ~ EID:", EID)
        navigate(`/location/edite/${EID}`)
    };
    const onClickAddLocation = (e) => {
        navigate("/location/add")

    };
 



    return (
        <div>
            <Header />
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Location List</h3>

            <div className="container">
                <form class="form-inline my-2 my-lg-0">
                    <div className="row ">
                        <input class="form-control mr-sm-2 inputSearch" type="text" placeholder='Enter the location' onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;
                        <button type="button" class="btn btn-primary inputSearch" onClick={(e) => onClickAddLocation()}>Add Location</button>
                    </div>
                </form>
            </div>
            <div className='table-div'>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Location Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Mobile Number</th>
                            <th scope="col">Devices</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLocations.map((location) => (
                            <tr>

                                <th scope="row">{location._id}</th>
                                <td>{location.name}</td>
                                <td>{location.address}</td>
                                <td>{location.phone}</td>
                                <td>
                                    {location.devices.map((index) => (
                                        <p>{index},</p>
                                    ))}
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning" onClick={() => onClickEdite(location._id)}>Edit</button> &nbsp;
                                    {/* <button type="button" class="btn btn-danger"onClick={() => deleteLocation(location._id)}>Delete</button> */}

                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default ListLocation