import "./globals.css";

export const metadata = {
  title: "Dialo",
  description: "موقع مجمع فيه نسخ مبسطة من أشهر المواقع العالمية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={` h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
