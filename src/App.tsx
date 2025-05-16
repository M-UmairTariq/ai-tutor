import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AppRoutes from './routes';
import { ThemeProvider } from './components/theme-provider';
import "./App.css"

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="eduplatform-theme">
        <Router>
          <AppRoutes />
          <Toaster />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;