import "./globals.css";
// import "@uploadthing/react/styles.css";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Provider from "@/components/Provider";

export const metadata = {
  title: "LinkThing",
  description: "Share your Socials Minimilistically",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
  manifest: "/manifest.json",
  twitter: {
    card: "summary_large_image",
    site: "linkthing",
    creator: "@tejas_bhovad",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <Provider>
          <div className="main w-full h-full">{children}</div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
