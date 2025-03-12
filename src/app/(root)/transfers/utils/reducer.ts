import { Action, Item } from "@/types/transfer.type";

const reducer = (state: Item[], action: Action): Item[] => {
  switch (action.type) {
    case "ADD_ITEM":
      return state.some((i) => i.id === action.item.id)
        ? state
        : [...state, action.item];

    case "INCREASE":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: Math.min(
                item.stock,
                item.quantity + (action.amount || 1),
              ),
            }
          : item,
      );

    case "DECREASE":
      return state.map((item) =>
        item.id === action.id
          ? {
              ...item,
              quantity: Math.max(0, item.quantity - (action.amount || 1)),
            }
          : item,
      );

    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id);

    default:
      return state;
  }
};

export default reducer;
