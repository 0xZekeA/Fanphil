import { Session } from "@supabase/supabase-js";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldErrors } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

interface AuthProviderContextTypes {
  isAdmin: boolean;
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
  user: User | null;
  control: Control<LoginFormData, any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<LoginFormData>;
  isSubmitting: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  resetPassword: () => Promise<void>;
  getUserId: () => Promise<string | null>;
  updateUser: (
    full_name: string,
    email: string,
    phone_number: string,
    role: string,
    pfp: string,
    address: string,
    user_id: string,
  ) => Promise<void>;
  sessionToken: string | null;
}
