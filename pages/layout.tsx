import Head from "next/head";
import Link from "next/link";

export default function Layout({
  children,
  header = "Printtikioski",
  title = "Printtikioski",
}: any) {
  return (
    <div className="">
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-screen-xl px-6 mx-auto ">
        <header className="pt-6 mb-6 sm:mb-10 sm:pt-10">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold sm:text-6xl">
              <Link href="/">{header}</Link>
            </h1>
            <div className="flex items-center gap-6 text-xl md:gap-16 md:text-4xl">
              <Link href="about" className="hidden sm:inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="hidden w-14 h-14 md:inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </header>

        <main className="container py-10 mx-auto">{children}</main>
      </div>
    </div>
  );
}
