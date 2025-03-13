const filterData = (isAdmin: boolean, data: User) => {
  const filtered = Object.fromEntries(
    Object.entries(data).filter(
      ([key]) =>
        key !== "updated_at" &&
        key !== "created_at" &&
        key !== "created_by" &&
        key !== "pfp" &&
        key !== "is_active" &&
        key !== "deleted" &&
        key !== "id",
    ),
  );
  const furtherFiltering = Object.fromEntries(
    Object.entries(filtered).filter(([key]) => key !== "address"),
  );

  return isAdmin ? filtered : furtherFiltering;
};

export default filterData;
