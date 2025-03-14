interface UsersProviderContextTypes {
  users: User[];
  sellers: User[];
  createAgent: (
    form: UserFormType,
    image: string | null,
  ) => Promise<{ success?: boolean | undefined } | undefined>;
}
