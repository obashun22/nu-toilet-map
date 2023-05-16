import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  Backdrop,
  Rating,
  Snackbar,
  SpeedDial,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import { GoogleMap, InfoWindowF, MarkerF } from "@react-google-maps/api";
import React, { memo, useEffect, useState } from "react";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { NU } from "../constants/examples";
import { FormDialog } from "../organisms/FormDialog";
import { PostToilet, Toilet } from "../types/toilet";
import { ApiClient } from "../api/apiClient";
import { NO_IMAGE, UNKNOWN_TOILET_NAME } from "../constants/default";

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
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [postImages, setPostImages] = useState<File[]>([]);
  const [postData, setPostData] = useState(initPostData);
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [modalImage, setModalImage] = useState("");

  const apiClient = new ApiClient();

  useEffect(() => {
    reloadToilets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reloadToilets = () => {
    apiClient.getToiletList().then((fetchedToilets) => {
      setToilets(
        fetchedToilets.sort((TA, TB) => (TA.createdAt > TB.createdAt ? -1 : 1))
      );
      // console.log("fetchedToilets", fetchedToilets);
    });
  };

  const handleMarkerClick = (
    id: string,
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
    setPostImages([]);
    reloadToilets();
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
        setPostImages(
          e.target.files ? ([...Array.from(e.target.files)] as File[]) : []
        );
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
    const urlList: string[] = [];
    await Promise.all(
      images.map(async (image) => {
        const imageUrl = await apiClient.postImage(image);
        urlList.push(imageUrl);
      })
    );
    console.log("urlList", urlList);
    return urlList;
  };

  const handleFormSubmit = () => {
    // 投稿処理
    setLoading(true);
    uploadImages(postImages).then((urlList) => {
      const newPostData: PostToilet = {
        ...postData,
        images: urlList,
      };
      apiClient
        .postToilet(newPostData)
        .then(() => {
          setIsFormOpen(false);
          handlePostModeExit();
          console.log("Form submited", postData);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <>
      {mode === "NORMAL" ? (
        <>
          <GoogleMap
            mapContainerStyle={mapStyle}
            center={center}
            zoom={16}
            clickableIcons={false}
            options={{
              disableDefaultUI: true,
              ...options,
            }}
            onClick={() => handleInfoWindowClose()}
          >
            {toilets.map((toilet) => (
              <MarkerF
                key={toilet.id}
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
                        overflowX: "visible",
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
                        {toilet.images.length ? (
                          toilet.images.map((image) => (
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
                              onClick={() => setModalImage(image)}
                            />
                          ))
                        ) : (
                          <img
                            src={NO_IMAGE}
                            alt="default"
                            height={110}
                            width={110}
                            style={{
                              borderRadius: 3,
                              objectFit: "cover",
                            }}
                          />
                        )}
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
                        {toilet.name || UNKNOWN_TOILET_NAME}
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
                      <Typography sx={{ my: 2, fontSize: 14 }}>
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
          <Modal
            open={modalImage ? true : false}
            onClose={() => setModalImage("")}
          >
            <img
              src={modalImage}
              alt="modal"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                maxWidth: "85vw",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Modal>
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
            sx={{ position: "fixed", bottom: 76, right: 92, zIndex: 1000 }}
            icon={<CloseIcon />}
            onClick={() => handlePostModeExit()}
          />
          <SpeedDial
            ariaLabel="Check"
            sx={{ position: "fixed", bottom: 76, right: 16, zIndex: 1000 }}
            icon={<CheckIcon />}
            onClick={() => setIsFormOpen(true)}
          />
          <FormDialog
            open={isFormOpen}
            postImages={postImages}
            postData={postData}
            onFormChange={handleFormChange}
            onCancel={handleFormClose}
            onSubmit={handleFormSubmit}
          />
        </>
      )}
      <Backdrop sx={{ color: "#fff", zIndex: 10002 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
