import React, { useState } from "react";
import useGeolocation from "../hooks/useGeolocation";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import "./Register.css";

// db.collection("houses").doc(doc.id).update({
//   disable: "true",
// });

function Register() {
  const location = useGeolocation();
  const { currentUser } = useAuth();
  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");
  const [house, setHouse] = useState("");
  const [gender, setGender] = useState("");
  const [field, setField] = useState("");

  const [loader, setLoader] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoader(true);

    db.collection("houses")
      .add({
        name: name,
        apartment: apartment,
        house: house,
        gender: gender,
        field: field,
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
        user: currentUser.email,
        disable: "false",
        verified: "false",
      })
      .then(() => {
        setLoader(false);
        alert("Your message has been submitted");
      })
      .catch((error) => {
        alert(error.message);
        setLoader(false);
      });

    setName("");
    setApartment("");
    setHouse("");
    setGender("");
    setField("");
  };

  const disable = (e) => {
    e.preventDefault();
    db.collection("houses").doc("oO8TABBd9JNBM5usvDb8").update({
      disable: "true",
    });
  };

  const enable = (e) => {
    e.preventDefault();
    db.collection("houses").doc("oO8TABBd9JNBM5usvDb8").update({
      disable: "false",
    });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="text-center">Register to help others</h3>
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Apartment Name</label>
        <input
          placeholder="Your apartment name..."
          value={apartment}
          onChange={(e) => setApartment(e.target.value)}
        />

        <label>House Number</label>
        <input
          placeholder="if applicable"
          value={house}
          onChange={(e) => setHouse(e.target.value)}
        />

        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="female"> Choose </option>
          <option value="female"> Female </option>
          <option value="male"> Male </option>
          <option value="other"> Other </option>
        </select>
        {/* <input
        placeholder="Your Gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />  */}

        <label>Your field of help</label>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="female"> Choose </option>
          <option value="both"> Both </option>
          <option value="threat"> Threat </option>
          <option value="sanitary"> Sanitary napkins </option>
        </select>
        {/* <input
        placeholder="Sanitary napkins or threat"
        value={field}
        onChange={(e) => setField(e.target.value)}
      /> */}

        <button type="submit">Submit</button>
      </form>
      <button className="disbtn" onClick={disable}>
        Disable
      </button>
      <button className="enbtn" onClick={enable}>
        Enable
      </button>
    </div>
  );
}

export default Register;
