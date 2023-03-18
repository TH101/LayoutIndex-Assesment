import axios from 'axios';
import React from 'react'
import './Addlocation.css'

const Addlocation = ()=> {
    const [locationPlayLoad, setLocationPlayLoad] = React.useState({
        name:"",
        address:"",
        phone:"",
      });
    console.log("🚀 ~ file: Addlocation.js:10 ~ Addlocation ~ locationPlayLoad:", locationPlayLoad)

    const onChangeInput = (e) => {
        setLocationPlayLoad({
          ...locationPlayLoad,
          [e.target.id]: e.target.value,
        });
      };


      const onClickShare = async e => {
        console.log("🚀 ~ file: AddDevice.js:16 ~ AddDevice ~ devicePlayLoad:", locationPlayLoad)
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:5000/api/location/create", locationPlayLoad);
          console.log(res)
          alert(res.data.message)
        
         window.location.href = '/device'
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
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Add Location</h3>
                  <form>

                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location name</label>
                      <input type="text" id='name' className="form-control form-control-lg" onChange={(e) => onChangeInput(e)} />
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Location Address</label>
                      <input type="text" id='address' className="form-control form-control-lg" onChange={(e) => onChangeInput(e)} />
                    </div>
                    <br />
                    <div className="form-outline">
                      <label className="form-label" for="firstName">Mobile Number</label>
                      <input type="number" id='phone' className="form-control form-control-lg" onChange={(e) => onChangeInput(e)} />
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

export default Addlocation