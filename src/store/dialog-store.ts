import { create } from "zustand";

interface DialogStoreState {
  open: boolean;
}
interface DialogStoreAction {
  setOpen: (state: boolean) => void;
}

export type DialogStoreType = DialogStoreState & DialogStoreAction;

export const useDialogStore = create<DialogStoreType>((set) => ({
  open: false,
  setOpen: (state) => set({ open: state }),
}));
