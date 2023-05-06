import EditIcon from "@mui/icons-material/Edit";
import { ImageList, ImageListItem, SpeedDial } from "@mui/material";
import {
  GoogleMap,
  InfoWindow,
  InfoWindowF,
  MarkerF,
} from "@react-google-maps/api";
import { useState } from "react";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";

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

  const divStyle = {
    background: "white",
    fontSize: 7.5,
  };

  const [open, setOpen] = useState(false);

  const options = {
    styles: [
      {
        featureType: "transit",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
    ],
  };
  return (
    <>
      <GoogleMap
        mapContainerStyle={mapStyle}
        center={nu}
        zoom={17}
        clickableIcons={false}
        options={{
          disableDefaultUI: true,
          ...options,
        }}
        onClick={() => setOpen(false)}
      >
        <MarkerF
          position={nu}
          animation={google.maps.Animation.DROP}
          onClick={() => setOpen(true)}
        >
          {open && (
            <InfoWindowF position={nu} onCloseClick={() => setOpen(false)}>
              <div
                style={{
                  width: 250,
                  height: 350,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    height: 110,
                    overflowX: "scroll",
                    scrollSnapType: "x mandatory",
                  }}
                >
                  {itemData.map((item, index) => (
                    <img
                      key={index}
                      src={item.img}
                      alt={item.title}
                      height={110}
                      width={110}
                      style={{
                        borderRadius: 3,
                        scrollSnapAlign: "start",
                        scrollSnapStop: "always",
                        objectFit: "cover",
                      }}
                    />
                  ))}
                </div>
                <h3 style={{ margin: "10px 0px 10px", lineHeight: "120%" }}>
                  <PlaceRoundedIcon
                    fontSize="small"
                    sx={{ verticalAlign: "-4px" }}
                  />
                  IB館南棟1階正面玄関トイレ
                </h3>
              </div>
            </InfoWindowF>
          )}
        </MarkerF>
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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
    rows: 2,
    cols: 2,
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
    cols: 2,
  },
];
