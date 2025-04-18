"use client";

import React, { useEffect } from "react";
import StoreProvider from "@/state/redux";
import { SessionProvider } from "next-auth/react";
import { Provider, useDispatch } from "react-redux";
import { setLoading, setUser } from "./store/slices/authSlices";
import store from "./store/store";
import { getSessionData } from "../../actions/storedData/methods";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
      <Provider store={store}>
        <ReduxInitializer />
        {children}
      </Provider>
  );
};

export const ReduxInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getSessionLocal(dispatch)
  }, [dispatch]);

  return null; // This is just a helper component to run the effect
};


const getSessionLocal=async(dispatch: any)=>
{
  const userDataHeader = await getSessionData();
    if (userDataHeader) {
      console.log("loading on")
      dispatch(setUser(userDataHeader?.user))
    }
    else
    {
      console.log("loading off")
      dispatch(setLoading(false))
    }
}

export default Providers;
