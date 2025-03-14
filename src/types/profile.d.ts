import { CloudinaryImage } from "@cloudinary/url-gen";
import { Dispatch, SetStateAction } from "react";

interface DataItem {
  name: string;
  icon: any;
  bgColor: string;
  haptic?: string;
}

type Data = {
  category: string;
  items: DataItem[];
};

interface PfpProviderContextTypes {
  image: CloudinaryImage;
  viewPfp: boolean;
  setViewPfp: Dispatch<SetStateAction<boolean>>;
  editPfp: () => Promise<void>;
  imagePubID: string;
  loading: boolean;
  cloudinaryUrl: string;
}

interface ProfileScreenContextTypes {
  isMessageShown: boolean;
  onClose: () => void;
  position: {
    x: number;
    y: number;
  };
  message: string;
  handleLongPress: (item: string) => Promise<void | null>;
  handlePress: (
    event: any,
    hapticType: "light" | "heavy" | "medium",
    item: string,
    longPress?: boolean,
  ) => void;
  isUserDetailsShown: boolean;
  setIsUserDetailsShown: Dispatch<SetStateAction<boolean>>;
  data: any[];
}

interface DetsInfoTypes {
  category: string;
  item: string | number | null | undefined;
}

type UserDetailsTypes = (user: User | null) => DetsInfoTypes[] | undefined;
