type PhotoType = {
  id: number;
  src: string;
};

export type ProductType = {
  currency: string;
  id: string;
  price: string;
  src: string;
  title: string;
  photo: PhotoType[];
};

type SectionType = {
  id: number;
  items: string[];
  title: string;
};

export type LaminateVariant = {
  elements: {
    [key: string]: ProductType;
  };
  sections: SectionType;
};
