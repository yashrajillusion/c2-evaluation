import { useState, useEffect } from "react";
import "./Rentals.css";
import axios from "axios";
export const Rentals = () => {
  const [db, setDb] = useState([]);

  useEffect(() => {
    let data = [];
    axios
      .get("http://localhost:8080/houses")
      .then((res) => {
        return res;
      })
      .then((res) => {
        data = res.data;
      });
    try {
      axios
        .get("https://giftcartbackendapp.herokuapp.com/api/products")
        .then((res) => {
          data.map((el, i) => (el.image = res.data[i].image));
          setDb(data);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="rentalContainer">
      <div className="sortingButtons">
        <button
          onClick={() => {
            let arr = db.sort((a, b) => b.id - a.id);
            setDb([...arr]);
          }}
          className="sortById"
        >
          Sort by ID
        </button>
        <button
          onClick={() => {
            let arr = db.sort((a, b) => +a.rent - +b.rent);
            setDb([...arr]);
          }}
          className="sortByRentAsc"
        >
          Rent Low to high
        </button>
        <button
          onClick={() => {
            let arr = db.sort((a, b) => +b.rent - +a.rent);
            setDb([...arr]);
          }}
          className="sortByRentDesc"
        >
          Rent High to low
        </button>
        <button
          onClick={() => {
            let arr = db.sort((a, b) => +a.areaCode - +b.areaCode);
            setDb([...arr]);
          }}
          className="sortByAreaAsc"
        >
          Area Low to high
        </button>
        <button
          onClick={() => {
            let arr = db.sort((a, b) => +b.areaCode - +a.areaCode);
            setDb([...arr]);
          }}
          className="sortByAreaDesc"
        >
          Area High to Low
        </button>
      </div>
      <input
        onChange={({ target }) => {
          let arr = db.filter((el) => {
            if (el.address.startsWith(target.value)) {
              return el;
            }
          });
          if (arr.length != 0) {
            setDb([...arr]);
          }
        }}
        className="searchAddress"
        type="text"
        placeholder="Search Address"
      />
      <table className="table" border="1">
        <thead>
          <tr>
            <th>Sl.no.</th>
            <th>Name</th>
            <th>Owner Name</th>
            <th>Address</th>
            <th>Area Code</th>
            <th>Rent</th>
            <th>Available For</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {db.map((house, index) => {
            return (
              <tr key={house.id} className="houseDetails">
                <td className="houseId">{house.id}</td>
                <td className="houseName">{house.name} </td>
                <td className="ownersName">{house.ownerName}</td>
                <td className="address">{house.address}</td>
                <td className="areaCode">{house.areaCode}</td>
                <td className="rent">{house.rent}</td>
                <td className="preferredTenants">
                  {
                    house.preferredTenant /* Show text Both or Bachelors or Married based on values */
                  }
                </td>
                <td className="houseImage">
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={house.image}
                    alt="house"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
