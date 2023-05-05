import {
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";

export const Post = () => {
  return (
    <Container maxWidth="sm" sx={{ mb: 8, px: 0 }}>
      <ImageList sx={{ m: "5px auto" }}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.title}
              subtitle={item.author}
              // actionIcon={
              //   <IconButton
              //     sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              //     aria-label={`info about ${item.title}`}
              //   >
              //     <InfoIcon />
              //   </IconButton>
              // }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
    featured: true,
  },
];
