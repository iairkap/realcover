"use client";
import GlobalContextProvider from "../app/store/layout";

import React from "react";

export default function AppProvider({ children }) {
  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}
