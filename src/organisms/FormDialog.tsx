import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TextField,
  TableRow,
  TableCell,
  TableBody,
  Rating,
} from "@mui/material";
import React, { memo } from "react";
import { PostToilet } from "../types/toilet";

type Props = {
  open: boolean;
  postImages: File[];
  postData: PostToilet;
  onFormChange: (e: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export const FormDialog: React.VFC<Props> = memo((props) => {
  const { open, postImages, postData, onFormChange, onCancel, onSubmit } =
    props;

  return (
    <Dialog open={open} sx={{ zIndex: 1001 }}>
      <DialogTitle>投稿</DialogTitle>
      <DialogContent>
        <DialogContentText>
          マップの改善にご協力ありがとうございます。
        </DialogContentText>
        <TextField
          name="name"
          value={postData.name}
          autoFocus
          margin="dense"
          id="name"
          label="トイレの場所"
          helperText="例: 全学教育等棟1F階段横トイレ"
          fullWidth
          variant="standard"
          onChange={(e) => {
            onFormChange(e);
          }}
        />
        <div
          style={{
            display: "flex",
            gap: 4,
            maxWidth: 400,
            overflowX: "scroll",
            marginTop: 8,
          }}
        >
          <ImageList images={postImages} />
        </div>
        <Button variant="contained" component="label" sx={{ mt: 1 }}>
          画像を選択
          <input
            type="file"
            name="images"
            hidden
            multiple
            accept="image/*"
            onChange={(e) => {
              onFormChange(e);
            }}
          />
        </Button>
        <Table size="small" sx={{ mt: 2 }}>
          <TableBody>
            <TableRow key={0}>
              <TableCell sx={{ border: "none" }}>アクセス</TableCell>
              <TableCell sx={{ border: "none" }}>
                <Rating
                  name="access"
                  value={postData.rate.access}
                  defaultValue={0}
                  onChange={(e) => {
                    onFormChange(e);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow key={1}>
              <TableCell sx={{ border: "none" }}>清潔さ</TableCell>
              <TableCell sx={{ border: "none" }}>
                <Rating
                  name="clean"
                  value={postData.rate.clean}
                  defaultValue={0}
                  onChange={(e) => {
                    onFormChange(e);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow key={2}>
              <TableCell sx={{ border: "none" }}>空き具合</TableCell>
              <TableCell sx={{ border: "none" }}>
                <Rating
                  name="crowded"
                  value={postData.rate.crowded}
                  defaultValue={0}
                  onChange={(e) => {
                    onFormChange(e);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow key={3}>
              <TableCell sx={{ border: "none" }}>キャパ</TableCell>
              <TableCell sx={{ border: "none" }}>
                <Rating
                  name="capacity"
                  value={postData.rate.capacity}
                  defaultValue={0}
                  onChange={(e) => {
                    onFormChange(e);
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow key={4}>
              <TableCell sx={{ border: "none" }}>設備</TableCell>
              <TableCell sx={{ border: "none" }}>
                <Rating
                  name="facility"
                  value={postData.rate.facility}
                  defaultValue={0}
                  onChange={(e) => {
                    onFormChange(e);
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <TextField
          name="comment"
          value={postData.comment}
          label="コメントを入力"
          multiline
          rows={4}
          fullWidth
          sx={{ mt: 2 }}
          onChange={(e) => {
            onFormChange(e);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>キャンセル</Button>
        <Button onClick={onSubmit}>投稿</Button>
      </DialogActions>
    </Dialog>
  );
});

type ImageListProps = {
  images: File[];
};

const ImageList: React.VFC<ImageListProps> = memo((props) => {
  const { images } = props;
  return (
    <>
      {images.map((image, index) => (
        <img
          key={index}
          src={URL.createObjectURL(image)}
          alt="Toilet"
          height={110}
          width={110}
          style={{
            borderRadius: 3,
            objectFit: "cover",
          }}
        />
      ))}
    </>
  );
});
