import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const Editlocation = () => {
    const params=useParams();
    const locationID=params.id;
    const [locationPlayLoad, setLocationPlayLoad] = React.useState({
        name:"",
        address:"",
        phone:"",
      });
    console.log("🚀 ~ file: Addlocation.js:10 ~ Addlocation ~ locationPlayLoad:", locationPlayLoad)
     const {name,address,phone}=locationPlayLoad

    useEffect(() => {
        const getOneLocations = async () => {
            await axios.get(`http://localhost:5000/api/location/${locationID}`).then((res) => {
                setLocationPlayLoad(res.data.data);
                console.log("🚀 ~ file: ListLocation.js:16 ~ awaitaxios.get ~ res:", res)
            }).catch((err) => {
                console.log(err.massage);
            })
        }
        getOneLocations();
    }, [])

    const onChangeInput = (e) => {
        setLocationPlayLoad({
          ...locationPlayLoad,
          [e.target.id]: e.target.value,
        });
      };


      const onClickShare = async e => {
        e.preventDefault();
        try {
          const res = await axios.put(`http://localhost:5000/api/update/location/${locationID}`, locationPlayLoad);
          console.log(res)
          alert(res.data.message)
        
         window.location.href = '/location'
      } catch (err) {
          console.log(err);
      
      }
      };
  return (
    <div>
        <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration" style={{ borderRadius: "15px" }}>
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Edit Location</h3>
                  <form>

                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location name</label>
                      <input type="text" id='name' className="form-control form-control-lg" defaultValue={name} onChange={(e) => onChangeInput(e)} />
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location Address</label>
                      <input type="text" id='address' className="form-control form-control-lg" defaultValue={address}onChange={(e) => onChangeInput(e)} />
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Mobile Number</label>
                      <input type="number" id='phone' className="form-control form-control-lg"defaultValue={phone} onChange={(e) => onChangeInput(e)} />
                    </div>
                    <br/>
                   


                    <div className="row">

                      <div className="col-md-3 mb-4 pb-2">

                      </div>
                      <div className="col-md-3 mb-4 pb-2">

                      </div>

                      <div className="col-md-3 mb-4 pb-2">
                     
                      </div>

                      <div className="col-md-3 mb-4 pb-2">
                        <input className="btn btn-primary btn-lg" type="submit" value="Submit" onClick={(e) => onClickShare(e)}/>
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

export default Editlocation