import Link from "next/link";

/**
 * @name SiteFooter
 * @param {Object} props
 */
export const SiteFooter = (props) => {
  return (
    <footer className="bg-gray-800 pt-10 sm:mt-10 pt-10">
      <div className="max-w-6xl m-auto text-gray-800 flex flex-wrap justify-left">
        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Getting Started
          </div>

          <Link href="/article/getting-started">
            <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Wallet Setup
            </a>
          </Link>
          <Link href="/article/defi-integrations">
            <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              How It Works
            </a>
          </Link>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Core Concepts
          </div>
          <Link href="/article/stablecoins">
            <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Stablecoins
            </a>
          </Link>
          <Link href="/article/personal-loans">
            <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Personal Loans
            </a>
          </Link>
          <Link href="/article/lending-borrowing">
            <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Lending/Borrowing
            </a>
          </Link>
          <Link href="/article/decentralized-exchange">
            <a className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700">
              Decentralized Exchange
            </a>
          </Link>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Purchase Cryptocurrency
          </div>
          <a
            href="https://www.coinbase.com/"
            className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            target="_blank"
          >
            Coinbase
          </a>
          <a
            href="https://www.binance.com"
            className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
            target="_blank"
          >
            Binance
          </a>
        </div>

        <div className="p-5 w-1/2 sm:w-4/12 md:w-3/12">
          <div className="text-xs uppercase text-gray-400 font-medium mb-6">
            Community
          </div>

          <a
            href="https://github.com/stableyield"
            className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/stableyield"
            target="_blank"
            className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
          >
            Twitter
          </a>
          <a
            href="#"
            className="my-3 block text-gray-300 hover:text-gray-100 text-sm font-medium duration-700"
          >
            Discord (Coming Soon)
          </a>
        </div>
      </div>

      <div className="pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 
            border-t border-gray-500 text-gray-400 text-sm 
            flex-col md:flex-row max-w-6xl"
        >
          <div className="mt-2">© Copyright 2020 | All Rights Reserved</div>

          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-facebook-f"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-twitter-alt"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-youtube"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-linkedin"></i>
            </a>
            <a href="#" className="w-6 mx-1">
              <i className="uil uil-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default SiteFooter;
