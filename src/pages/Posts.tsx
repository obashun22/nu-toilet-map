import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Rating,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import { TOILET_EXAMPLE_LIST } from "../constants/examples";

export const Posts = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ mb: 8, px: 0 }}>
      <ImageList sx={{ m: "5px auto" }}>
        {TOILET_EXAMPLE_LIST.map((toilet) => (
          <ImageListItem
            key={toilet.id}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/posts/${12}`);
            }}
          >
            <img
              src={toilet.images[0]}
              alt={toilet.name}
              // loading="lazy"
            />
            <ImageListItemBar
              title={toilet.name}
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
