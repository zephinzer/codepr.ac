import { useEffect, useState } from "react";
import { connect } from "react-redux";
import ContentList from "./ContentList";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";
import { getRepository } from "controllers/github/repository";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Project({ dispatch, history, match, state }) {
  const searchParams = new URLSearchParams(history.location.search);
  const { platform, owner, repo } = match.params;
  const ref = searchParams.get("ref");
  const path = searchParams.get("path") || "/";
  const { accessToken } = state.authentication;
  const [data, setData] = useState({
    error: null,
    success: null,
    data: null,
  });

  useEffect(() => {
    if (accessToken && accessToken !== "unset") {
      (async function () {
        const repositoryInfo = await getRepository({
          accessToken,
          owner,
          repo,
        });
        setData(
          repositoryInfo.isError
            ? {
                error: repositoryInfo.message,
                success: false,
              }
            : {
                error: null,
                data: repositoryInfo.data,
                success: true,
              }
        );
      })();
    }
  }, [accessToken]);
  return (
    <div className="page-project">
      {/*
       * header
       */}
      {data.success === false ? (
        [
          <h1 key="header">An error happened...</h1>,
          <span key="description">{data.error}</span>,
        ]
      ) : data.success === true ? (
        [
          <h1 key="header">
            {data.data.owner.login}/{data.data.name}
          </h1>,
          <span key="description">{data.data.description}</span>,
        ]
      ) : (
        <h1>Loading your project...</h1>
      )}
      <ContentList
        accessToken={accessToken}
        platform={platform}
        owner={owner}
        repo={repo}
        path={path}
        commitSha={ref}
      />
    </div>
  );
});
