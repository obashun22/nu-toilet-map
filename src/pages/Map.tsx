import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  Rating,
  Snackbar,
  SpeedDial,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { memo, useState } from "react";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { TOILET_EXAMPLE_LIST, NU } from "../constants/examples";
import { FormDialog } from "../organisms/FormDialog";
import { PostToilet } from "../types/toilet";
import { ApiClient } from "../api/apiClient";

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

const TopNavBarHeight = 56;
const BottomNavBarHeight = 56;
const mapStyle = {
  width: "100vw",
  height: window.innerHeight - (TopNavBarHeight + BottomNavBarHeight),
};

const initPostData: PostToilet = {
  name: "",
  position: NU,
  images: [],
  rate: {
    access: 0,
    clean: 0,
    crowded: 0,
    capacity: 0,
    facility: 0,
  },
  comment: "",
};

export const Map = memo(() => {
  const [mode, setMode] = useState<"NORMAL" | "POST">("NORMAL");
  const [center, setCenter] = useState(NU);
  const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [postData, setPostData] = useState(initPostData);

  const apiClient = new ApiClient();

  const handleMarkerClick = (
    id: number,
    position: { lat: number; lng: number }
  ) => {
    setSelectedMarker(id);
    setCenter(position);
  };
  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  const handlePostModeExit = () => {
    setMode("NORMAL");
    setPostData(initPostData);
  };
  const handleFormMapChange = (e: google.maps.MapMouseEvent) => {
    setPostData({
      ...postData,
      position: {
        lat: e.latLng ? e.latLng.lat() : NU.lat,
        lng: e.latLng ? e.latLng.lng() : NU.lng,
      },
    });
  };
  const handleFormClose = () => {
    setIsFormOpen(false);
  };
  const handleFormChange = (e: any) => {
    switch (e.target.name) {
      case "images":
        setPostData({
          ...postData,
          [e.target.name]: e.target.files
            ? [...Array.from(e.target.files)]
            : [],
        });
        break;
      case "name":
      case "comment":
        setPostData({
          ...postData,
          [e.target.name]: e.target.value,
        });
        break;
      case "access":
      case "clean":
      case "crowded":
      case "capacity":
      case "facility":
        setPostData({
          ...postData,
          rate: {
            ...postData.rate,
            [e.target.name]: parseInt(e.target.value),
          },
        });
        break;
      default:
        break;
    }
  };
  const uploadImages = async (images: File[]) => {
    await postData.images.forEach(async (image) => {
      await apiClient.postImage(image);
    });
  };
  const handleFormSubmit = () => {
    // 投稿処理
    uploadImages(postData.images).then(() => {
      apiClient.postToilet(postData).then(() => {
        handlePostModeExit();
        setIsFormOpen(false);
      });
    });
    console.log("Form submission", postData);
    setIsFormOpen(false);
    setMode("NORMAL");
    setPostData(initPostData);
  };

  return (
    <>
      {mode === "NORMAL" ? (
        <>
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={center}
            zoom={17}
            clickableIcons={false}
            options={{
              disableDefaultUI: true,
              ...options,
            }}
            onClick={() => handleInfoWindowClose()}
          >
            {TOILET_EXAMPLE_LIST.map((toilet) => (
              <MarkerF
                position={toilet.position}
                animation={google.maps.Animation.DROP}
                onClick={() => handleMarkerClick(toilet.id, toilet.position)}
              >
                {selectedMarker === toilet.id && (
                  <InfoWindowF
                    position={toilet.position}
                    onCloseClick={() => handleInfoWindowClose()}
                  >
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
                        }}
                      >
                        {toilet.images.map((image) => (
                          <img
                            key={image}
                            src={image}
                            alt={image}
                            height={110}
                            width={110}
                            style={{
                              borderRadius: 3,
                              objectFit: "cover",
                            }}
                          />
                        ))}
                      </div>
                      <h3
                        style={{
                          margin: "10px 0px 10px",
                          lineHeight: "120%",
                        }}
                      >
                        <PlaceRoundedIcon
                          fontSize="small"
                          sx={{
                            verticalAlign: "-4px",
                          }}
                        />
                        {toilet.name}
                      </h3>
                      <Table size="small">
                        <TableBody>
                          <RateTableRow
                            label="アクセス"
                            rate={toilet.rate.access}
                          />
                          <RateTableRow
                            label="清潔さ"
                            rate={toilet.rate.clean}
                          />
                          <RateTableRow
                            label="空き具合"
                            rate={toilet.rate.crowded}
                          />
                          <RateTableRow
                            label="キャパ"
                            rate={toilet.rate.capacity}
                          />
                          <RateTableRow
                            label="設備"
                            rate={toilet.rate.facility}
                          />
                        </TableBody>
                      </Table>
                      <Typography sx={{ my: 2, fontSize: 13 }}>
                        {toilet.comment}
                      </Typography>
                      {/* <div
                        style={{
                          textAlign: "center",
                          marginTop: 6,
                        }}
                      >
                        <Button
                          color="primary"
                          size="small"
                          startIcon={<EditIcon />}
                          sx={{ width: "100%" }}
                          onClick={() => {
                            // 編集処理
                          }}
                        >
                          編集
                        </Button>
                      </div> */}
                    </div>
                  </InfoWindowF>
                )}
              </MarkerF>
            ))}
          </GoogleMap>
          <SpeedDial
            ariaLabel="Post Action"
            sx={{ position: "fixed", bottom: 76, right: 16 }}
            icon={<EditIcon />}
            onClick={() => setMode("POST")}
          />
        </>
      ) : (
        <>
          {!isFormOpen && (
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={true}
              message="トイレの場所にマーカーを立ててください"
              sx={{ marginTop: 8 }}
            />
          )}
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={NU}
            zoom={17}
            clickableIcons={false}
            options={{
              disableDefaultUI: true,
              ...options,
            }}
            onClick={(e) => handleFormMapChange(e)} // 押下した場所にMarkerを作成
          >
            <MarkerF position={postData.position} />
          </GoogleMap>
          <SpeedDial
            ariaLabel="Cancel"
            sx={{ position: "fixed", bottom: 76, right: 92 }}
            icon={<CloseIcon />}
            onClick={() => handlePostModeExit()}
          />
          <SpeedDial
            ariaLabel="Check"
            sx={{ position: "fixed", bottom: 76, right: 16 }}
            icon={<CheckIcon />}
            onClick={() => setIsFormOpen(true)}
          />
          <FormDialog
            open={isFormOpen}
            postData={postData}
            onFormChange={handleFormChange}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </>
      )}
    </>
  );
});

type Props = {
  label: string;
  rate: number;
};

const RateTableRow: React.VFC<Props> = memo((props) => {
  const { label, rate } = props;
  return (
    <TableRow key={label}>
      <TableCell sx={{ border: "none", padding: "0px 6px" }}>{label}</TableCell>
      <TableCell sx={{ border: "none", padding: "0px" }}>
        <Rating
          name="simple-controlled"
          value={rate}
          defaultValue={0}
          size="small"
          readOnly
        />
      </TableCell>
    </TableRow>
  );
});
