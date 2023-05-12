import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ApiClient } from "../api/apiClient";
import { Toilet } from "../types/toilet";
import { NO_IMAGE } from "../constants/default";

const apiClient = new ApiClient();

export const Posts = () => {
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    apiClient.getToiletList().then((fetchedToilets) => {
      setToilets(
        fetchedToilets.sort((TA, TB) => (TA.createdAt > TB.createdAt ? -1 : 1))
      );
    });
  }, []);
  return (
    <Container maxWidth="sm" sx={{ mb: 8, px: 0 }}>
      <ImageList sx={{ m: "5px auto" }}>
        {toilets.map((toilet) => (
          <ImageListItem
            key={toilet.id}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/posts/${toilet.id}`);
            }}
          >
            <img
              src={toilet.images[0] ?? NO_IMAGE}
              alt={toilet.name}
              style={{ height: 150 }}
              // loading="lazy"
            />
            <ImageListItemBar
              title={toilet.name || "名もなきトイレ"}
              subtitle={
                <Rating
                  name="average"
                  value={Math.round(
                    Object.values(toilet.rate).reduce(
                      (prev, current) => prev + current,
                      0
                    ) / Object.values(toilet.rate).length
                  )}
                  defaultValue={0}
                  size="small"
                  readOnly
                  emptyIcon={
                    <StarIcon
                      style={{ opacity: 1, color: "white" }}
                      fontSize="inherit"
                    />
                  }
                />
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};
