// import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold">Makers gonna make</h3>
            <p className="text-lg">
              Monthly hackathon style events for indie hackers
            </p>
          </div>
          {/* <nav>
            <ul className="flex space-x-4">
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-secondary transition-colors"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
        <div className="mt-8 text-center">
          © {new Date().getFullYear()} Makers gonna make. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
