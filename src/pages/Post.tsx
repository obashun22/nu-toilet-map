import {
  Container,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import { TOILET_EXAMPLE } from "../constants/examples";

export const Post = () => {
  const toilet = TOILET_EXAMPLE;
  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <div
        style={{
          display: "flex",
          gap: 4,
          height: 150,
          overflowX: "scroll",
        }}
      >
        {toilet.images.map((image) => (
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
          />
        ))}
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
        {toilet.name}
      </h3>
      <Table size="small">
        <TableBody>
          <TableRow key={0}>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              アクセス
            </TableCell>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              <Rating name="access" value={3} defaultValue={0} readOnly />
            </TableCell>
          </TableRow>
          <TableRow key={1}>
            <TableCell sx={{ border: "none", paddingY: "0" }}>清潔さ</TableCell>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              <Rating name="access" value={3} defaultValue={0} readOnly />
            </TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              空き具合
            </TableCell>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              <Rating name="access" value={3} defaultValue={0} readOnly />
            </TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell sx={{ border: "none", paddingY: "0" }}>キャパ</TableCell>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              <Rating name="access" value={3} defaultValue={0} readOnly />
            </TableCell>
          </TableRow>
          <TableRow key={4}>
            <TableCell sx={{ border: "none", paddingY: "0" }}>設備</TableCell>
            <TableCell sx={{ border: "none", paddingY: "0" }}>
              <Rating name="access" value={3} defaultValue={0} readOnly />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Typography sx={{ my: 2, fontSize: 13 }}>{toilet.comment}</Typography>
    </Container>
  );
};
