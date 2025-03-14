export interface FinancialDataTypes {
  initial: string;
  later: number;
  profit?: boolean;
  notCash?: boolean;
}

declare interface ListItemProps {
  initial: string;
  later: number;
  notCash?: boolean;
  profit?: boolean;
}

interface ExpenseForm {
  reason: string;
  amount: string;
}

declare interface ExpenseContextProps {
  isExpenseModalOpen: boolean;
  setIsExpenseModalOpen: (open: boolean) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  control: Control<ExpenseForm>;
  errors: FieldErrors<ExpenseForm>;
  isSubmitting: boolean;
}
