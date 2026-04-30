import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Лента' }} />
        <Stack.Screen name="src/components/screens/Feed/PostDetails/PostDetails" options={{ title: 'Пост' }} />
      </Stack>
    </QueryClientProvider>
  );
}
