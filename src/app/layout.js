import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TitleUpdater from "../components/TitleUpdater";
import { Toaster } from "react-hot-toast";

export const metadata = {
  description: "MediQueue is a professional tutor booking platform for online and offline learning sessions.",
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content antialiased">
        <AuthProvider>
          <ThemeProvider>
            <TitleUpdater />
            <Navbar />
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <Footer />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'var(--bg-toast, #ffffff)',
                  color: 'var(--color-toast, #1f2937)',
                  borderRadius: '1rem',
                  border: '1px solid var(--border-toast, #e5e7eb)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                },
                success: {
                  iconTheme: {
                    primary: '#10b981',
                    secondary: '#ffffff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#ffffff',
                  },
                },
              }}
            />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
