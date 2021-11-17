import { User } from "./user";

export interface Photo {

  photoId: number;
  imagePath: string;
  imageFileName: string;
  uploader: User;

}
