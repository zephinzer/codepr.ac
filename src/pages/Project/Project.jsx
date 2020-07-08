import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";
import { getRepositoryCommits } from "controllers/github/repository";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Project({ dispatch, history, match, state }) {
  // TODO: platform currently not used but when gitlab is integrated the behaviour should be changed
  const { platform, owner, repo } = match.params;
  const { accessToken } = state.authentication;
  const [data, setData] = useState({
    error: null,
    commits: [],
    success: null,
  });
  useEffect(() => {
    if (accessToken) {
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
        return setData({
          error: null,
          commits: commits.data,
          success: true,
        });
      })();
    }
  }, [accessToken]);
  if (data.repo !== {}) {
    console.log(data.repo);
  }
  return (
    <div className="page-project">
      <h1>Project</h1>
      {data.success === false ? (
        <div className="error-state">Failed to retrieve repository</div>
      ) : (
        <div className="success-state">Select a commit from below</div>
      )}
      {data.success === true ? (
        <ul className="commit-history">
          {data.commits.map((commit) => (
            <li className="commit-entry" key={commit.sha}>
              <span className="commit-message">{commit.commit.message}</span>
              <span className="username">{commit.author.login}</span>
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
