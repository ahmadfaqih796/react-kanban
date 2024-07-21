import { create } from "zustand";

const useAlertStore = create((set) => ({
  alert: null,
  setAlert: (type, message) => set({ alert: { type, message } }),
  clearAlert: () => set({ alert: null }),
}));

export default useAlertStore;
