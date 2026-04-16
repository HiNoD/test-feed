import React from 'react';
import { View } from "react-native";
import Feed from "./components/screens/Feed/Feed";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Feed />
      </View>
    </QueryClientProvider>
  );
}
