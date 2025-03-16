interface UsersProviderContextTypes {
  users: User[];
  sellers: User[];
  createUser: (
    form: UserFormType,
    image: string | null,
  ) => Promise<{ success?: boolean | undefined } | undefined>;
}
