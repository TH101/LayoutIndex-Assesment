import axios from 'axios';
import React, { useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
const AddDevice = () => {
  const [image, setImage] = React.useState("");
  const [locations, setLocations] = React.useState([]);
  const [locationsArray, setLocationsArray] = React.useState([]);
  console.log("🚀 ~ file: AddDevice.js:9 ~ AddDevice ~ locationsArray:", locationsArray)
  const [devicePlayLoad, setDevicePlayLoad] = React.useState({
    serialNumber: "",
    type: "",
    image:"",
    locationName: "",
    status: "",
    locationId: "",
  });

  console.log("🚀 ~ file: AddDevice.js:16 ~ AddDevice ~ devicePlayLoad:", devicePlayLoad)

  const onChangeInput = (e) => {
    setDevicePlayLoad({
      ...devicePlayLoad,
      [e.target.id]: e.target.value,
    });
  };
  
  const onLocationId =  (e) => {
   console.log("🚀 ~ file: AddDevice.js:27 ~ onLocationId ~ e:", e)
   let combinedValues = e.target.value;
    let valuesArray = combinedValues.split("|");
    console.log("🚀 ~ file: AddDevice.js:29 ~ onLocationId ~ valuesArray:", valuesArray[0])
    setDevicePlayLoad({
      ...devicePlayLoad,
      locationId:valuesArray[0],
      locationName:valuesArray[1],
    });

};
  



useEffect(()=>{
  const getAllLocations = async () => {
    await axios.get(`http://localhost:5000/api/location/`).then((res) => {
        console.log("🚀 ~ file: PharmacistHome.js ~ line 101 ~ awaitaxios.get ~ res", res);
        setLocations(res.data.data);
    }).catch((err) => {
        console.log(err.massage);
    })
}
  getAllLocations();
},[])



  const onClickShare = async e => {
    console.log("🚀 ~ file: AddDevice.js:16 ~ AddDevice ~ devicePlayLoad:", devicePlayLoad)
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/device/create", devicePlayLoad);
      console.log(res)
      alert(res.data.message)
     window.location.href = '/device'
  } catch (err) {
      console.log(err.response.data.message);
  }
  };

  const options = [
    { value: "pos", label: "POS" },
    { value: "kiosk", label: "kiosk" },
    { value: "signage", label: "signage" },
  ];

  // const locations = [
  //   { id: "6413f9046ea888e4852dee2f", value: "pos", label: "kurnagala" },
  //   { id: "2", value: "kisok", label: "dandarawela" },
  // ];


  const handleImageChange = async e => {
    e.preventDefault()
    try {
        const file = e.target.files[0]

        if (!file) return alert("File not exist.")

        if (file.size > 1024 * 1024) // 1mb
            return alert("Size too large!")

        if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
            return alert("File format is incorrect.")

        let formData = new FormData()
        formData.append('file', file)

        // setLoading(true)
        const res = await axios.post( "http://localhost:5000/api/imageUpload",
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        // setLoading(false)
        setDevicePlayLoad({
          ...devicePlayLoad,
          image: res.data.url,
        });
        alert(res.data.message);
      } catch (err) {
        console.log(err.response.data.msg);
        
      }
}
  return (
    <div>
      <ToastContainer/>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Device Form</h3>
                  <form>

                    <div className="form-outline">
                      <label className="form-label" for="firstName">Serial Number</label>
                      <input type="text" id='serialNumber' className="form-control form-control-lg" onChange={(e) => onChangeInput(e)} />
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label select-label">Device Type</label>
                      <br />
                      <select className="select form-control-lg" id="type" onChange={(e) => onChangeInput(e)}>
                        <option value="1" disabled>Choose option</option>
                        {options.map((options) => (
                          <option value={options.value}>{options.label}</option>
                        ))}
                      </select>
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label select-label">Location</label>
                      <br />
                      <select className="select form-control-lg"  name="locationName" onChange={(e) => onLocationId(e)}>
                        <option value="1" disabled>Choose option</option>
                        {locations.map((location,index) => (
                          <option value={location._id+"|"+location.name} >{location.name}</option>
                        ))}
                      </select>
                    
                    </div>
                    <br />
                    <div className="form-outline">
                      <div class="mb-3">
                        <label for="formFile" class="form-label">Add Device image</label>
                        <input class="form-control" type="file" id="formFile" 
                        onChange={handleImageChange}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label select-label">status</label>

                    </div>
                    <div className="row ">
                      <div className="col-md-6 mb-4">


                        <input
                          type="radio"
                          id="status"
                          value="active"
                          name="status"
                          onChange={(e) => onChangeInput(e)}
                        />&nbsp; Active

                      </div>

                      <div className="col-md-6 mb-4">


                        <input
                          type="radio"
                          id="status"
                          value="inactive"
                          name="status"
                          onChange={(e) => onChangeInput(e)}
                        /> &nbsp; Inactive
                      </div>
                    </div>

                    <div className="row">

                      <div className="col-md-3 mb-4 pb-2">

                      </div>
                      <div className="col-md-3 mb-4 pb-2">

                      </div>

                      <div className="col-md-3 mb-4 pb-2">

                      </div>

                      <div className="col-md-3 mb-4 pb-2">
                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" onClick={(e) => onClickShare(e)} />
                      </div>

                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddDevice