import {
  Container,
  Modal,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { useEffect, useState } from "react";
import { Toilet } from "../types/toilet";
import { ApiClient } from "../api/apiClient";
import { useParams } from "react-router-dom";
import { NO_IMAGE, UNKNOWN_TOILET_NAME } from "../constants/default";

const apiClient = new ApiClient();

export const Post: React.VFC = () => {
  const [toilet, setToilet] = useState<Toilet | null>(null);
  const [modalImage, setModalImage] = useState<string>("");

  const { id } = useParams();
  // toiletをapiClientで取得
  useEffect(() => {
    apiClient.getToilet(id!).then((fetchedToilet) => {
      setToilet(fetchedToilet);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      {toilet ? (
        <>
          <div
            style={{
              display: "flex",
              gap: 4,
              height: 150,
              overflowX: "scroll",
            }}
          >
            {toilet.images.length ? (
              toilet.images.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={image}
                  height={150}
                  width={150}
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
                height={150}
                width={150}
                style={{
                  borderRadius: 3,
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <h3
            style={{
              margin: "15px 0px 10px",
              lineHeight: "120%",
              fontFamily: "Roboto",
            }}
          >
            <PlaceRoundedIcon
              fontSize="small"
              sx={{
                verticalAlign: "-4px",
              }}
            />
            {toilet?.name || UNKNOWN_TOILET_NAME}
          </h3>
          <Table size="small">
            <TableBody>
              <TableRow key={0}>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  アクセス
                </TableCell>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  <Rating
                    name="access"
                    value={toilet.rate.access}
                    defaultValue={0}
                    readOnly
                  />
                </TableCell>
              </TableRow>
              <TableRow key={1}>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  清潔さ
                </TableCell>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  <Rating
                    name="access"
                    value={toilet.rate.clean}
                    defaultValue={0}
                    readOnly
                  />
                </TableCell>
              </TableRow>
              <TableRow key={2}>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  空き具合
                </TableCell>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  <Rating
                    name="access"
                    value={toilet.rate.crowded}
                    defaultValue={0}
                    readOnly
                  />
                </TableCell>
              </TableRow>
              <TableRow key={3}>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  キャパ
                </TableCell>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  <Rating
                    name="access"
                    value={toilet.rate.capacity}
                    defaultValue={0}
                    readOnly
                  />
                </TableCell>
              </TableRow>
              <TableRow key={4}>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  設備
                </TableCell>
                <TableCell sx={{ border: "none", paddingY: "0" }}>
                  <Rating
                    name="access"
                    value={toilet.rate.facility}
                    defaultValue={0}
                    readOnly
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Typography sx={{ my: 2 }}>{toilet?.comment ?? ""}</Typography>
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
        <Typography variant="body1">読み込み中...</Typography>
      )}
    </Container>
  );
};
