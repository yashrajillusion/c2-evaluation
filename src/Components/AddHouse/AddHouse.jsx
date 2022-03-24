import axios from "axios";
import { useState } from "react";
export const AddHouse = () => {
  const [data, setData] = useState({"name":"","ownerName":"","address":"","areaCode":"","rent":"","image":"","preferredTenant":""})

  const handleChange = (e)=>{
    setData({...data,[e.target.className]:e.target.value})
  };
  const chekHandle = ({target})=>{
    if(target.checked){
      setData({...data,"preferredTenant":target.className})
    }else{
      setData({...data,"preferredTenant":""})
    }

  }
  const datatoJson = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:8080/houses",data).then((res)=>{
      console.log(res.data)
      setData({"name":"","ownerName":"","address":"","areaCode":"","rent":"","image":"","preferredTenant":""})
    })
  }

  return (
    <div className="addHouseContainer">
      <form onSubmit={datatoJson}>
        <label>name</label>
        <input onChange={handleChange} type="text" className="name" value={data.name} required />
        <br />
        <label>ownerName</label>
        <input value={data.ownerName} onChange={handleChange} type="text"  className="ownerName" required />
        <br />
        <label>address</label>
        <input value={data.address} onChange={handleChange} type="text" className="address" required />
        <br />
        <label>areaCode</label>
        <input value={data.areaCode} onChange={handleChange} type="text" className="areaCode" required />
        <br />
        <label>rent</label>
        <input value={data.rent} onChange={handleChange} type="text" className="rent" required />
        <br />
        <label>preferredTenant</label>
        <br />
        <label>bachelor</label>
        <input  onChange={chekHandle} type="checkbox" className="bachelor" />
        <br />
        <label>married</label>
        <input  onChange={chekHandle} type="checkbox" className="married" />
        <br />
        <label>image</label>
        <input  value={data.image} onChange={handleChange} type="text" className="image" required />
        <br />
        <input className="submitBtn" type="submit" />
      </form>
    </div>
  );
};
