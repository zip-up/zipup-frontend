import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthContext from "@/context/AuthContext";
import ReactQueryClient from "@/context/ReactQueryContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata = {
  title: {
    default: "Instagram",
    template: "Instagram | %s",
  },
  description: "Instagram Photos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="w-full h-full overflow-auto mx-auto">
        <AuthContext>
          <header className="sticky top-0 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <ReactQueryClient>
            <main>{children}</main>
            <ReactQueryDevtools initialIsOpen={true} />
          </ReactQueryClient>
        </AuthContext>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
