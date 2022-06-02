import { appState } from './../models/types';
import create from 'zustand';


 const useStore = create<appState>((set) => ({
     
    //Used in App.tsx
    user: undefined,
    userData: undefined,
    initializing: true,
    test: 'Hello World',
    setUser: (user: any) => set((state) => ({ user: user })),
    setUserData: (userData: any) => set((state) => ({ userData: userData })),
    setInitializing: (initializing: boolean) => set((state) => ({ initializing: initializing })),

    //Used in Login.tsx
    phoneNumber: '+971',
    SMSConfirm: null, //null if no SMS was sent to the phone.
    OTP: '',
    setPhoneNumber: (phoneNumber: string) => set((state) => ({ phoneNumber: phoneNumber })),
    setSMSConfirm: (SMSConfirm: any) => set((state) => ({ SMSConfirm: SMSConfirm })),
    setOTP: (OTP: string) => set((state) => ({ OTP: OTP })),

    //Used Globally
    errors: { app: false, login: false, profile: false },

}));

export default useStore;