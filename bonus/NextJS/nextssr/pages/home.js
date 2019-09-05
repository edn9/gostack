import React from "react";
import "../styles.scss";

import Link from "next/link";
import Head from "next/head";

import withAnalytics from "~/hocs/withAnalytics";

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>
    <img src="/static/rocket.jpg" width="200" alt="rocketseat" />
    <div className="center">
      <div className="example">Rocketseat</div>
      <br></br>
      <Link href="users">
        <a>Equipe</a>
      </Link>
    </div>
  </div>
);

export default withAnalytics()(Home);
