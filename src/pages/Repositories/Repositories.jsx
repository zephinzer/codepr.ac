import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";
import { getUserRepositories } from "controllers/github/repositories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faNewspaper,
  faGlasses,
  faShare,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";

function selectRepository({ apiUrl, history }) {
  const urlComponents = apiUrl.split("/");
  const repo = urlComponents[urlComponents.length - 1];
  const owner = urlComponents[urlComponents.length - 2];
  history.push(`/_/commits/github/${owner}/${repo}`);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Repositories({ dispatch, history, match, state }) {
  const { pageNumber } = match.params;
  const { accessToken } = state.authentication;
  const [data, setData] = useState({
    error: null,
    repositories: [],
    success: null,
  });
  useEffect(() => {
    if (accessToken && accessToken !== "unset") {
      (async function f() {
        const repos = await getUserRepositories({
          accessToken,
          pageNumber: pageNumber || 1,
        });
        if (repos.isError) {
          return setData({
            error: repos.message,
            success: false,
          });
        }
        return setData({
          error: null,
          repositories: repos.data,
          success: true,
        });
      })();
    }
  }, [accessToken]);
  return (
    <div className="page-repositories">
      <h1>Repositories</h1>
      {data.success === false ? (
        <div>Failed to load repositories: {data.error}</div>
      ) : data.success === true ? (
        <div>Select a repository from the list below</div>
      ) : (
        <div>Loading...</div>
      )}
      {data.success === true ? (
        <ul className="repository-list">
          {data.repositories.map((item, index) => (
            <li
              aria-label={item.full_name}
              key={index}
              onClick={() => selectRepository({ apiUrl: item.url, history })}
            >
              <div
                className="image"
                style={{
                  backgroundImage: `url(${item.owner.avatar_url})`,
                  backgroundSize: "cover",
                }}
              >
                {item.owner.avatar_url ? null : (
                  <FontAwesomeIcon className="icon" icon={faUser} size="sm" />
                )}
              </div>
              <div className="info">
                <span className="name">{item.name}</span>
                <span className="full-name">{item.full_name}</span>
                <span className="description">{item.description}</span>
              </div>
              <div className="numbers">
                <span className="stars">
                  <FontAwesomeIcon className="icon" icon={faStar} />
                  {item.stargazers_count}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
});
