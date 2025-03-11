export const formatDate = (
  date: string | Date,
  format: "long" | "short" = "long",
) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Invalid date";

  return d.toLocaleDateString("en-US", {
    day: "numeric",
    month: format === "long" ? "long" : "short",
    year: "numeric",
  });
};
