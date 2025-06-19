import { Action, Item } from "@/types/purchases.type";

const isActionWithId = (action: Action): action is Action & { id: string } => {
  return (
    action.type === "INCREASE" ||
    action.type === "DECREASE" ||
    action.type === "REMOVE_ITEM"
  );
};

const reducer = (
  state: Map<string, Item>,
  action: Action,
): Map<string, Item> => {
  const item = isActionWithId(action) ? state.get(action.id) : null;

  switch (action.type) {
    case "ADD_ITEM":
      return state.has(action.item.id)
        ? state
        : new Map(state).set(action.item.id, action.item);

    case "INCREASE":
      return item
        ? new Map(state).set(action.id, {
            ...item,
            quantity: Math.min(
              state.get(action.id)?.stock || 0,
              (state.get(action.id)?.quantity || 0) + (action.amount || 1),
            ),
          })
        : state;

    case "DECREASE":
      return item
        ? new Map(state).set(action.id, {
            ...item,
            quantity: Math.max(0, item.quantity - (action.amount || 1)),
          })
        : state;

    case "REMOVE_ITEM":
      return state.delete(action.id) ? state : new Map(state);

    case "CLEAR_ITEMS":
      return new Map();

    default:
      return state;
  }
};

export default reducer;
