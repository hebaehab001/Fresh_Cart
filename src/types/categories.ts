export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AllCategories {
  allCategories: Category[];
}

export interface SidebarFilterationProps {
  data: Category[];
  title: string;
  selected: string | null;
  onSelect: (value: string | null) => void; // A function that updates state with a string or null
}