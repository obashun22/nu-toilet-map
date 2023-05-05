import EditIcon from "@mui/icons-material/Edit";
import { SpeedDial } from "@mui/material";
import {
  GoogleMap,
  InfoWindow,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";

export const Map = () => {
  const TopNavBarHeight = 56;
  const BottomNavBarHeight = 56;
  const mapStyle = {
    width: "100vw",
    height: window.innerHeight - (TopNavBarHeight + BottomNavBarHeight),
  };
  const nu = {
    lat: 35.1540423,
    lng: 136.9660006,
  };
  const center = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const positionAkiba = {
    lat: 35.69731,
    lng: 139.7747,
  };

  const positionIwamotocho = {
    lat: 35.69397,
    lng: 139.7762,
  };

  const divStyle = {
    background: "white",
    fontSize: 7.5,
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={center}
        zoom={17}
        clickableIcons={false}
        options={{
          disableDefaultUI: true,
        }}
        onClick={() => setOpen(false)}
      >
        <MarkerF
          position={center}
          animation={google.maps.Animation.DROP}
          onClick={() => setOpen(true)}
        >
          {open && (
            <InfoWindowF position={center} onCloseClick={() => setOpen(false)}>
              <div>This is an InfoWindow</div>
            </InfoWindowF>
          )}
        </MarkerF>
        <InfoWindowF position={positionAkiba}>
          <div style={divStyle}>
            <h1>秋葉原オフィス</h1>
            どゆことですか
          </div>
        </InfoWindowF>
        <InfoWindow position={positionIwamotocho}>
          <div style={divStyle}>
            <h1>岩本町オフィス</h1>
          </div>
        </InfoWindow>
      </GoogleMap>
      <SpeedDial
        ariaLabel="Post Action"
        sx={{ position: "fixed", bottom: 76, right: 16 }}
        icon={<EditIcon />}
        onClick={() => console.log("Post Action")}
      />
    </>
  );
};
