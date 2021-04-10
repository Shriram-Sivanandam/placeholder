import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import useGeolocation from "../hooks/useGeolocation";
import "../components/TMap.css";
import { db } from "../firebase";
import markerVM from "../images/vme.png";
import markerUVF from "../images/ufe.png";
import markerVF from "../images/vfe.png";
import markerUVM from "../images/ume.png";
import curloc from "../images/curloc.svg";

var coordsUVM = [];
var coordsVM = [];
var coordsUVF = [];
var coordsVF = [];

db.collection("houses")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (
        (doc.data().field == "both" || doc.data().field == "sanitary") &&
        doc.data().disable == "false"
      ) {
        if (doc.data().gender == "male") {
          if (doc.data().verified == "true") {
            coordsVM.push([
              doc.id,
              doc.data().lng,
              doc.data().lat,
              doc.data().apartment,
              doc.data().house,
            ]);
          } else {
            coordsUVM.push([
              doc.id,
              doc.data().lng,
              doc.data().lat,
              doc.data().apartment,
              doc.data().house,
            ]);
          }
        }
        if (doc.data().gender == "female") {
          if (doc.data().verified == "true") {
            coordsVF.push([
              doc.id,
              doc.data().lng,
              doc.data().lat,
              doc.data().apartment,
              doc.data().house,
            ]);
          } else {
            coordsUVF.push([
              doc.id,
              doc.data().lng,
              doc.data().lat,
              doc.data().apartment,
              doc.data().house,
            ]);
          }
        }
      }
    });
  });

console.log(coordsVF);

function TMapPage() {
  const [viewport, setViewport] = useState({
    latitude: 13.0037834,
    longitude: 80.2569061,
    width: "100vh",
    height: "100vh",
    zoom: 16,
  });
  const [selected, setSelected] = useState(null);
  const [info, setInfo] = useState([]);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={
          "pk.eyJ1Ijoic2hyaXJhbS1zaXZhbmFuZGFtIiwiYSI6ImNrbmFobzE0YzEyM3YycXRhdTY3NGQ2a2EifQ.7KK1CyE7TaK6grvhNPoRfg"
        }
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >
        {coordsUVM.map((location) => (
          <Marker
            key={location[0]}
            latitude={location[2]}
            longitude={location[1]}
          >
            <button
              className="markerBtn"
              onClick={(e) => {
                e.preventDefault();
                setSelected(location);
                setInfo([location[1], location[2], location[3], location[4]]);
              }}
            >
              <img src={markerUVM} />
            </button>
          </Marker>
        ))}
        ,
        {coordsUVF.map((location) => (
          <Marker
            key={location[0]}
            latitude={location[2]}
            longitude={location[1]}
          >
            <button
              className="markerBtn"
              onClick={(e) => {
                e.preventDefault();
                setSelected(location);
                setInfo([location[1], location[2], location[3], location[4]]);
              }}
            >
              <img src={markerUVF} />
            </button>
          </Marker>
        ))}
        ,
        {coordsVM.map((location) => (
          <Marker
            key={location[0]}
            latitude={location[2]}
            longitude={location[1]}
          >
            <button
              className="markerBtn"
              onClick={(e) => {
                e.preventDefault();
                setSelected(location);
                setInfo([location[1], location[2], location[3], location[4]]);
              }}
            >
              <img src={markerVM} />
            </button>
          </Marker>
        ))}
        ,
        {coordsVF.map((location) => (
          <Marker
            key={location[0]}
            latitude={location[2]}
            longitude={location[1]}
          >
            <button
              className="markerBtn"
              onClick={(e) => {
                e.preventDefault();
                setSelected(location);
                setInfo([location[1], location[2], location[3], location[4]]);
              }}
            >
              <img src={markerVF} />
            </button>
          </Marker>
        ))}
        <Marker key={103} latitude={13.003437} longitude={80.25577236}>
          <button className="markerBtn">
            <img src={curloc} />
          </button>
        </Marker>
        {selected ? (
          <Popup
            latitude={info[1]}
            longitude={info[0]}
            onClose={() => {
              setSelected(null);
            }}
          >
            <div>
              <h5>Apartment: {info[2]}</h5>
              <h5>House No.: {info[3]}</h5>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}

export default TMapPage;
