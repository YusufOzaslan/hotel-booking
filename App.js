import React from "react";
import AppContainer from "./src/navigations/AppNavigation";
import { AuthProvider } from "./src/context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppContainer />
    </AuthProvider>
  );
}
