import { CategoryKind } from "./CategoryKind";

export interface Category {
    id: number;
    value: string;
    kind: CategoryKind;
  }