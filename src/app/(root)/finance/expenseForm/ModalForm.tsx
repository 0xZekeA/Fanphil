import Modal from "@/components/Modal";
import React from "react";
import { useExpenseFormContext } from "../providers/ExpenseProviders";
import ExpenseCard from "./ExpenseCard";

const ModalForm = () => {
  const { isExpenseModalOpen, setIsExpenseModalOpen } = useExpenseFormContext();
  return (
    <Modal
      isOpen={isExpenseModalOpen}
      onClose={() => setIsExpenseModalOpen(false)}
      withInput
    >
      <ExpenseCard />
    </Modal>
  );
};

export default ModalForm;
