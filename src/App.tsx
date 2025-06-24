import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { AuthProvider } from './components/auth/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Header component with links
const Header = () => (
  <div className="fixed top-5 right-3 bg-background text-black z-50">
    <div className='flex flex-row gap-2'>
      <Link to="/login" className="hover:underline">đăng nhập</Link>
      <Link to="/register" className="hover:underline">đăng ký</Link>
    </div>
  </div>
);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="flex flex-col h-screen bg-background relative">
      <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
