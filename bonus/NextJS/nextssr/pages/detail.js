import React from "react";
import axios from "axios";
import "../styles.scss";

import Link from "next/link";

import withAnalytics from "~/hocs/withAnalytics";

const Detail = ({ user }) => (
  <div className="center">
    <div className="example">{user.login}</div>
    <img src={user.avatar_url} alt="avatar" width="200" />
    <p id="bio">{user.bio}</p>
    <Link href={user.html_url}>
      <a>github</a>
    </Link>
    <p>
      <Link href="/users">
        <a>Voltar</a>
      </Link>
    </p>
  </div>
);

Detail.getInitialProps = async ({ query }) => {
  const response = await axios.get(
    `https://api.github.com/users/${query.user}`
  );

  return { user: response.data };
};

export default withAnalytics()(Detail);
