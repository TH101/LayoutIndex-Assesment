import axios from 'axios';
import React, { useEffect } from 'react'
import Header from '../Header/Header';
import './Device.css'

const ListDevice = () => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [devices, setDevices] = React.useState([]);
    useEffect(()=>{
        const getAllDevices = async () => {
          await axios.get(`http://localhost:5000/api/device/`).then((res) => {
            setDevices(res.data.data);
          console.log("🚀 ~ file: ListLocation.js:16 ~ awaitaxios.get ~ res:", res)
          }).catch((err) => {
              console.log(err.massage);
          })
      }
        getAllDevices();
      },[])

    // const devices = [
    //     {
    //         _id: "6412b763881ded8b99816744",
    //         serialNumber: "1",
    //         type: "kiosk",
    //         locationName: "bandarawela",
    //         image: "https://res.cloudinary.com/de9zkpp0w/image/upload/v1675758106/Reports/cixhudwusaouzuc1bav0.jpg",
    //         status: "inactive",

    //     },
    //     {
    //         _id: "6412b7f1881ded8b9981674c",
    //         serialNumber: "2",
    //         type: "kiosk",
    //         locationName: "bandarawela",
    //         image: "https://res.cloudinary.com/de9zkpp0w/image/upload/v1675758106/Reports/cixhudwusaouzuc1bav0.jpg",
    //         status: "inactive",

    //     },
    //     {
    //         _id: "6412be0a47347f6c7d380849",
    //         serialNumber: "3",
    //         type: "kiosk",
    //         locationName: "bandarawela",
    //         image: "https://res.cloudinary.com/de9zkpp0w/image/upload/v1675758106/Reports/cixhudwusaouzuc1bav0.jpg",
    //         status: "inactive",

    //     },
    //     {
    //         _id: "6412be0a47347f6c7d380849",
    //         serialNumber: "3",
    //         type: "kiosk",
    //         locationName: "bandarawela",
    //         image: "https://res.cloudinary.com/de9zkpp0w/image/upload/v1675758106/Reports/cixhudwusaouzuc1bav0.jpg",
    //         status: "inactive",

    //     },
    //     {
    //         _id: "6412be0a47347f6c7d380849",
    //         serialNumber: "3",
    //         type: "kiosk",
    //         locationName: "bandarawela",
    //         image: "https://res.cloudinary.com/de9zkpp0w/image/upload/v1675758106/Reports/cixhudwusaouzuc1bav0.jpg",
    //         status: "inactive",

    //     }
    // ];


    
    const filteredDevices = devices.filter((devices) => {
        return (
            devices.serialNumber.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.type.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.locationName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
            devices.status.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
    });
    const deleteDevices = async (DevicesId) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/device/deleteDeviceRemoveLocation/${DevicesId}`);
            alert(res.data.message)
            console.log(res.data.msg)
        } catch (error) {
            console.log(error.data.msg);
        }
        // setCallback(true)
    }


    return (
        <div>
            <Header />
            <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Devices List</h3>
            <br />
            <div className="container">
                <form class="form-inline my-2 my-lg-0">
                    <div className="row ">
                        <input class="form-control mr-sm-2 inputSearch" type="text" placeholder='Enter the location or device name ' onChange={(e) => setSearchTerm(e.target.value)} />&nbsp;
                        <a type="a" class="btn btn-primary inputSearch" href="/device/add">add device</a>
                    </div>
                </form>
            </div>
            <br/>
            <div className='row div1'>
                {filteredDevices.map((devices) => (
                    <div className='col-md-3 mb-4 pb-4'>
                        <div class="card" style={{ width: "18rem" }}>
                            <img class="card-img-top" src={devices.image} alt="Card image cap" />
                            <div class="card-body">
                                <h5 class="card-title">{devices.serialNumber}</h5>
                                <p class="card-text">{devices.type}</p>
                                <p class="card-text">{devices.locationName}</p>
                                <p class="card-text">{devices.status}</p>
                                <div className='row'>
                                    <div className='col-md-3 mb-4 pb-4'>
                                        <a href={`/device/edit/${devices._id}`}class="btn btn-warning">Edit</a>&nbsp;

                                    </div>
                                    <div className='col-md-3 mb-4 pb-4'>
                                    </div>
                                    <div className='col-md-3 mb-4 pb-4'>
                                           <button type="button" class="btn btn-danger"onClick={() => deleteDevices(devices._id)}>Delete</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default ListDevice