export type userProfile = {
    uid?: string,
    displayName?: string,
    email?: string,
    phoneNumber?: string,
    photoURL?: string,
    emirate?: string,
    plateNo?: string,
    carType?: string,
    carColor?: string
}
export interface appState {
    //Used in App.tsx
    user: any; //auth user
    userData: any; //firestore user data
    initializing: boolean; //initializing firebase
    setUser: (user : any) => void;
    setUserData: (userData : any) => void;
    setInitializing: (initializing : boolean) => void;

    //Used in Login.tsx
    phoneNumber: string;
    SMSConfirm: any; //null if no SMS was sent to the phone.
    OTP: string;
    setPhoneNumber: (phoneNumber : string) => void;
    setSMSConfirm: (SMSConfirm : any) => void;
    setOTP: (OTP : string) => void;

    //Used Globally
    errors: {app: boolean, login: boolean, profile: boolean}
}