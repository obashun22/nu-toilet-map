import { Toilet } from "../types/toilet";

export const NU = {
  lat: 35.1540423,
  lng: 136.9660006,
};

export const TOILET_EXAMPLE: Toilet = {
  id: "1",
  name: "IB館南棟1階正面玄関トイレ",
  position: {
    lat: 35.1540423,
    lng: 136.9660006,
  },
  images: [
    "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  ],
  rate: {
    access: 2,
    clean: 3,
    crowded: 4,
    capacity: 3,
    facility: 5,
  },
  comment:
    "ここのトイレは清潔で、設備も充実している。アクセスも良く、混雑具合も少ない。ただ、トイレットペーパーがないことがあるので、持参した方が良い。基本的には、ここを使うことが多い。 ぜひ、使ってみてください。そういえば、ここのトイレは、男女兼用なので、女性の方は、男性が入っていることがあるので、注意してください。",
  createdAt: new Date(),
};

export const TOILET_EXAMPLE_LIST = [
  {
    ...TOILET_EXAMPLE,
    id: "1",
    position: {
      lat: NU.lat + Math.random() / 1000,
      lng: NU.lng + Math.random() / 1000,
    },
  },
  {
    ...TOILET_EXAMPLE,
    id: "2",
    position: {
      lat: NU.lat + Math.random() / 1000,
      lng: NU.lng + Math.random() / 1000,
    },
  },
  {
    ...TOILET_EXAMPLE,
    id: "3",
    position: {
      lat: NU.lat + Math.random() / 1000,
      lng: NU.lng + Math.random() / 1000,
    },
  },
  {
    ...TOILET_EXAMPLE,
    id: "4",
    position: {
      lat: NU.lat + Math.random() / 1000,
      lng: NU.lng + Math.random() / 1000,
    },
  },
  {
    ...TOILET_EXAMPLE,
    id: "5",
    position: {
      lat: NU.lat + Math.random() / 1000,
      lng: NU.lng + Math.random() / 1000,
    },
  },
  {
    ...TOILET_EXAMPLE,
    id: "6",
    position: {
      lat: NU.lat + Math.random() / 1000,
      lng: NU.lng + Math.random() / 1000,
    },
  },
];
