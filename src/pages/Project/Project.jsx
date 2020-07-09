import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";
import {
  getRepository,
  getRepositoryContents,
} from "controllers/github/repository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faFileAlt,
  faFolder,
  faFile,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Project({ dispatch, history, match, state }) {
  const searchParams = new URLSearchParams(history.location.search);
  const { platform, owner, repo } = match.params;
  const ref = searchParams.get("ref");
  const { accessToken } = state.authentication;
  const [data, setData] = useState({
    meta: {
      error: null,
      success: null,
      data: {},
    },
    content: {
      error: null,
      success: null,
      data: {},
    },
  });

  useEffect(() => {
    if (accessToken && accessToken !== "unset") {
      (async function () {
        const [repositoryInfo, commitContent] = await Promise.all([
          getRepository({
            accessToken,
            owner,
            repo,
          }),
          getRepositoryContents({
            accessToken,
            owner,
            repo,
            ref,
          }),
        ]);
        const meta = repositoryInfo.isError
          ? {
              error: repositoryInfo.message,
              success: false,
            }
          : {
              error: null,
              data: repositoryInfo.data,
              success: true,
            };
        const content = commitContent.isError
          ? {
              error: commitContent.message,
              success: false,
            }
          : {
              error: null,
              data: commitContent.data,
              success: true,
            };
        setData({
          meta,
          content,
        });
      })();
    }
  }, [accessToken]);
  console.log(data);
  const { meta, content } = data;
  return (
    <div className="page-project">
      {/*
       * header
       */}
      {meta.success === false ? (
        <h1>Project</h1>
      ) : meta.success === true ? (
        [
          <h1 key="header">
            {meta.data.owner.login}/{meta.data.name}
          </h1>,
          <span key="description">{meta.data.description}</span>,
        ]
      ) : (
        <h1>Loading...</h1>
      )}
      {/*
       * body
       */}
      {content.success === false ? (
        <div className="content-load-error"></div>
      ) : content.success === true ? (
        <Contents data={content.data} />
      ) : (
        <div className="content-loading"></div>
      )}
    </div>
  );
});

function Contents({ data }) {
  return (
    <ul className="contents">
      {data.map((listing) => (
        <li key={listing.sha}>
          <span className="type">
            {listing.type === "file" ? (
              <i className="file">
                <FontAwesomeIcon icon={faFile} inverse fixedWidth />
              </i>
            ) : listing.type === "dir" ? (
              <i className="dir">
                <FontAwesomeIcon icon={faFolder} inverse fixedWidth />
              </i>
            ) : (
              <i className="others">
                <FontAwesomeIcon icon={faEllipsisH} inverse fixedWidth />
              </i>
            )}
          </span>
          <span className="name">{listing.name}</span>
        </li>
      ))}
    </ul>
  );
}
