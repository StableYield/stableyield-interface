import "../public/css/tailwind.css";
import "../public/css/styles.css";
import "tailwindcss/tailwind.css";
import React from "react";
import App from "next/app";
import Head from "next/head";
import { Providers, EthereumSync } from "../src/components";
import DashboardLayout from "../src/layout/dashboard";
import SiteLayout from "../src/layout/site";
import ArticleLayout from "../src/layout/article";

/**
 * @name Application
 */
class Application extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    const isArticleRoute = router.pathname.startsWith('/article') ? true : false
    const isDashboardRoute = router.pathname.startsWith('/dashboard') ? true : false

    return (
      <>
        <Head>
          <title>SwableSwaps - Automated Stablecoin lending</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Providers>
          <EthereumSync/>
          <>
          {
            isArticleRoute && (<ArticleLayout>
            <Component {...pageProps} key={router.route} />
          </ArticleLayout>)
          }
          {
            isDashboardRoute && (<DashboardLayout>
            <Component {...pageProps} key={router.route} />
          </DashboardLayout>)
          }
          {!isDashboardRoute && !isArticleRoute && 
            <SiteLayout>
              <Component {...pageProps} key={router.route} />
            </SiteLayout>
            }
          </>
        </Providers>
      </>
    );
  }
}

export default Application;
