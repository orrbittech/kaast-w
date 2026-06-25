/** KAAST — Proprietary software of Orrbit Systems (https://www.orrbit.co.za/) */
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Urbanist, Caveat } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { BillingStatusProvider } from "@/lib/context/billing-status-provider";
import { clerkAppearance } from "@/lib/clerk-appearance";
import "./globals.css";
import { cn } from "@/lib/utils";

const urbanist = Urbanist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-urbanist",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-caveat",
});

const SITE_URL = "https://kaast.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "KAAST | Digital Media Management for South African SMEs - Music, Menus, Ads Across Stores",
    template: "%s | KAAST",
  },
  description:
    "Manage digital media across branches and stores from your phone. Music, images, menus, ads. Consistent branding. Affordable South African solution by Orrbit Systems. Mobile, web, TV.",
  keywords: [
    "digital media management South Africa",
    "SME signage software",
    "multi-store branding",
    "cloud signage",
    "Orrbit Systems",
    "KAAST",
    "digital signage",
    "restaurant menu boards",
    "retail media management",
  ],
  authors: [
    {
      name: "Brandon N NKawu",
      url: "https://www.linkedin.com/in/brandonnkawu/",
    },
    { name: "Orrbit Systems", url: "https://www.orrbit.co.za/" },
  ],
  creator: "Orrbit Systems",
  publisher: "Orrbit Systems",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: SITE_URL,
    siteName: "KAAST",
    title:
      "KAAST | Digital Media Management for South African SMEs - Music, Menus, Ads Across Stores",
    description:
      "Manage digital media across branches and stores from your phone. Music, images, menus, ads. Consistent branding. Affordable. South African solution by Orrbit Systems.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KAAST - Digital media management for South African small businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "KAAST | Digital Media Management for South African SMEs - Music, Menus, Ads Across Stores",
    description:
      "Manage digital media across branches and stores from your phone. South African solution by Orrbit Systems.",
    creator: "@orrbittech",
    site: "@orrbittech",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "KAAST",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, iOS",
      description:
        "Manage digital media across branches and stores from your phone. Music, images, menus, ads. Consistent branding for South African SMEs.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "ZAR",
      },
      author: [
        {
          "@type": "Person",
          name: "Brandon N NKawu",
          url: "https://www.linkedin.com/in/brandonnkawu/",
          telephone: "+27739590288",
        },
        {
          "@type": "Organization",
          name: "Orrbit Systems",
          url: "https://www.orrbit.co.za/",
          sameAs: ["https://x.com/orrbittech"],
        },
      ],
    },
    {
      "@type": "Organization",
      name: "Orrbit Systems",
      url: "https://www.orrbit.co.za/",
      sameAs: ["https://x.com/orrbittech", "https://www.linkedin.com/company/orrbit-systems"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={cn(urbanist.variable, caveat.variable, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider appearance={clerkAppearance}>
            <BillingStatusProvider>{children}</BillingStatusProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
