export type Toilet = {
  id: string;
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
  createdAt: Date;
};

export type PostToilet = Omit<Toilet, "id" | "createdAt">;
