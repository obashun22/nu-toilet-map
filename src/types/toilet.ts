export type Toilet = {
  id: number;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  images: string[];
  rate: {
    access: number;
    clean: number;
    crowded: number;
    capacity: number;
    facility: number;
  };
  comment: string;
};

export type PostToilet = Omit<Toilet, "id" | "images"> & { images: File[] };
