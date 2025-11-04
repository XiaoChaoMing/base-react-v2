import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import { AppProvider } from './app/providers';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
