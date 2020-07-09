import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";
import { getRepositoryCommits } from "controllers/github/repository";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function selectCommit({
  accessToken,
  history,
  platform,
  owner,
  repo,
  commit,
}) {
  console.log(`accessing commit ${commit.sha}:`, commit);
  history.push(`/_/project/${platform}/${owner}/${repo}?ref=${commit.sha}`);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Commits({ dispatch, history, match, state }) {
  // TODO: platform currently not used but when gitlab is integrated the behaviour should be changed
  const { platform, owner, repo } = match.params;
  const { accessToken } = state.authentication;
  const [data, setData] = useState({
    error: null,
    commits: [],
    success: null,
  });
  useEffect(() => {
    if (accessToken && accessToken !== "unset") {
      (async function f() {
        const commits = await getRepositoryCommits({
          accessToken,
          owner,
          repo,
        });
        if (commits.isError) {
          return setData({
            error: commits.message,
            success: false,
          });
        }
        console.info(commits);
        return setData({
          error: null,
          commits: commits.data,
          success: true,
        });
      })();
    }
  }, [accessToken]);
  return (
    <div className="page-commits">
      <h1>Select a Commit</h1>
      {data.success === false ? (
        <div className="error-state">Failed to retrieve repository</div>
      ) : data.success === true ? (
        <div className="success-state">
          Select a commit from this repository:
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {data.success === true ? (
        <ul className="commit-history">
          {data.commits.map((commit) => (
            <li
              className="commit-entry"
              key={commit.sha}
              onClick={() =>
                selectCommit({
                  accessToken,
                  history,
                  platform,
                  owner,
                  repo,
                  commit,
                })
              }
            >
              <span
                className="image"
                style={{
                  backgroundImage: `url(${
                    commit.author
                      ? commit.author.avatar_url
                        ? commit.author.avatar_url
                        : ""
                      : ""
                  })`,
                  backgroundSize: "cover",
                }}
              >
                {commit.author && commit.author.avatar_url ? (
                  ""
                ) : (
                  <FontAwesomeIcon className="icon" icon={faUser} size="lg" />
                )}
              </span>
              <span className="commit-message">{commit.commit.message}</span>
              <span className="username">
                {commit.author && commit.author.login
                  ? commit.author.login
                  : commit.commit.author
                  ? commit.commit.author.name
                  : "unknown"}
              </span>
              <span className="commit-sha">{commit.sha.slice(0, 8)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="error-message">{data.error}</div>
      )}
    </div>
  );
});
