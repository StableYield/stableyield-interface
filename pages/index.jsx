import Link from "next/link";
import {
  ProductFeatureSmall,
  ProductFeatureVertical,
  AaveTokenAPY,
} from "../src/components";

import { AaveStableCoinAPYRates } from "../src/views";

/**
 * @name AaveMaker
 * @param {Object} props
 */
const AaveMaker = (props) => {
  return (
    <>
      <HeroSectionMain />
      <MainSection />
      <DemoSection />
      <AppicationsSection />
    </>
  );
};

export default AaveMaker;

const HeroSectionMain = (props) => {
  return (
    <div className="hero-section px-10 flex flex-col gradient-yellow-to-pinks gradient-green-to-blue">
      <div className="absolute inset-y-0 right-0 w-full opacity-10 z-0">
        <img
          className="h-56 w-full object-cover w-full h-full"
          src="https://images.unsplash.com/photo-1606189934732-1c274f894bf9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt=""
        />
      </div>
      <div className="flex-center flex-1 py-1 mt-24 relative z-10">
        <div className="text-center text-white text-center">
          <h2 className="text-6xl lg:text-8xl font-black text-shadow-md">
            Let Your Money <br /> Work For You
          </h2>
          <p className="lg:text-3xl max-w-2xl font-thin mx-auto">
            Keep your <strong>exposure to ETH</strong> while <br />{" "}
            <strong>earning interest</strong> lending stablecoins
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start w-full">
            <div className="rounded-md shadow w-1/2">
              <Link href="/dashboard/vault">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 md:py-4 md:text-lg md:px-10"
                >
                  Dashboard
                </a>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3 w-1/2">
              <Link href="/dashboard/account">
                <a
                  href="#"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-white md:py-4 md:text-lg md:px-10"
                >
                  Account
                </a>
              </Link>
            </div>
          </div>
          <button className="btn-green btn-xl mt-5">
            <span className="font-light">
              Buy Cryptocurrency &amp; Start Earning Today
            </span>
          </button>
        </div>
      </div>
      <div className="card py-10 px-8 shadow-lg min-h-8 w-full mx-auto max-w-screen-lg translate-b-2/4 z-10">
        <span className="absolute -top-3 -right-4 tag-indigo shadow-md border-2 border-solid border-white">
          Stablecoin Lending APY
        </span>
        <AaveStableCoinAPYRates />
      </div>
    </div>
  );
};

const MainSection = (props) => {
  return (
    <div className="py-12 bg-white pt-48 px-10 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercases">
            Earn Interest &amp; Invest into Cryptocurrency
          </h2>
          <p className="gradient-indigo text-gradient text-4xl md:text-6xl lg:text-8xl font-extrabold mt-2 text-gray-900 ">
            <span className="md:font-thin">Smart Money for</span> <br /> Modern
            Investors
          </p>
          <p className="mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto">
            Use{" "}
            <span className="text-indigo-500 font-bold">
              decentralized finance
            </span>{" "}
            to make your money start working for you. In just a couple of
            minutes start earning between{" "}
            <span className="text-indigo-500 font-bold">5% to 20% APY</span>{" "}
            without a third-party.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <ProductFeatureSmall
              label="Keep Your Exposure to ETH"
              description="ETH is a valuable cryptocurrency that continues to rise in value. Keep your exposure to ETH by using it as collateral to withdraw stabletokens."
              image="/icons/deposit.png"
            />
            <ProductFeatureSmall
              label="Earn Compounding Interest on Stablecoins"
              description="Earn interest (between 2% to 15%) on deposited stablecoins and generate recurring income using trusted decentralized finance products."
              image="/icons/stack-of-money.png"
            />
            <ProductFeatureSmall
              label="Automatically Swap Lending Positions"
              description="Easily swap between the highest yielding stablecoins lending positions in a single transaction. Markets move and you can easily follow."
              image="/icons/refund-2.png"
            />
            <ProductFeatureSmall
              label="Join the Decentralized Finance Future"
              description="Blockchain and decentralized finance applications empowers everyday users to be in control of their assets. "
              image="/icons/duration-finance.png"
            />
          </dl>
        </div>
      </div>
    </div>
  );
};

const DemoSection = (props) => {
  return (
    <div className="relative bg-white overflow-hidden lg:mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-6xl tracking-tight font-extrabold text-gray-900">
                <span className="block">Hold Crypto</span>
                <span className="block text-indigo-600">
                  Earn Realtime Interest
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                <strong>
                  Decentralized Finance is emerging finance ecosystem.
                </strong>{" "}
                StableYield uses leading DeFi platforms to give you the power to
                easily start earning compounding interest on your assets.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/article/how-it-works">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10">
                      How It Works
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

const AppicationsSection = (props) => {
  return (
    <section className="container py-12 px-4 mx-auto text-center">
      <h2 className="text-8xl text-indigo-700 gradient-indigo text-gradient mb-2 leading-tight font-black font-heading">
        The Future of <br /> Money and Finance
      </h2>
      <p className="max-w-2xl mx-auto mb-12 text-2xl text-gray-500">
        Utilize emerging financial technologies to stay in control of your
        finances and have you money work for you.
      </p>
      <div className="flex flex-wrap mx-12">
        <ProductFeatureVertical
          title="MakerDAO"
          tagline="Personal Loan"
          image="/dapps/maker.svg"
          description="Keep your exposure to ETH and withdraw stablecoins (cryptocurrency pegged to 1 USD) to use for lending."
        />
        <ProductFeatureVertical
          title="Aave"
          tagline="Lending/Borrowing"
          image="/dapps/aave.svg"
          description="Deposit your digital assets and start earning compounding interest and a steady return."
        />
        <ProductFeatureVertical
          title="Curve"
          tagline="Stablecoin Exchange"
          image="/dapps/curve.svg"
          description="Low-cost stablecoin and wrapped Bitcoin transactions swaps for cost effective lending positions changes."
        />
      </div>
    </section>
  );
};
