interface UsersProviderContextTypes {
  users: User[];
  sellersInventory: SellersInventory[];
  transferItems: TransferItem[];
  sellers: User[];
  createAgent: (
    form: UserFormType,
    image: string | null,
  ) => Promise<{ success?: boolean | undefined } | undefined>;
}
