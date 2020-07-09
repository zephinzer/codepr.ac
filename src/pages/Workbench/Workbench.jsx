import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getFileContent } from "controllers/github/file";
import { mapStateToProps, mapDispatchToProps } from "GlobalStateProvider";

async function retrieveData({
  accessToken,
  owner,
  repo,
  path,
  commitSha,
  setData,
}) {
  const fileContents = await getFileContent({
    accessToken,
    owner,
    repo,
    path,
    ref: commitSha,
  });
  setData(
    fileContents.isError
      ? {
          error: fileContents.message,
          success: false,
        }
      : {
          error: null,
          data: fileContents.data,
          success: true,
        }
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Workbench({ dispatch, history, match, state }) {
  const { accessToken } = state.authentication;
  const [data, setData] = useState({
    success: null,
    error: null,
    data: null,
  });
  const { platform, owner, repo } = match.params;
  const searchParams = new URLSearchParams(history.location.search);
  const commitSha = searchParams.get("ref");
  const path = searchParams.get("path");
  useEffect(() => {
    accessToken &&
      accessToken !== "unset" &&
      retrieveData({ accessToken, owner, repo, path, commitSha, setData });
  }, [accessToken]);
  console.info(`using platform '${platform}`);
  console.info(`repo path is '${owner}/${repo}'`);
  console.info(`using commit with sha '${commitSha}'`);
  console.info(`file path is '${path}'`);

  let decodedData;
  if (data.success === true) {
    console.log(data.data);
    if (data.data.encoding === "base64") {
      decodedData = atob(data.data.content).split("\n");
    }
  }
  console.info(decodedData);
  return (
    <div className="page-workbench">
      <h1>Workbench</h1>
      {data.success === false ? (
        <div className="file-load-error">{data.error}</div>
      ) : data.success === null ? (
        <div className="file-loading">Loading...</div>
      ) : (
        <div className="file">
          {decodedData.map((line, index) => (
            <Line key={index} number={index + 1} content={line} />
          ))}
        </div>
      )}
    </div>
  );
});

function Line({
  number, // line number
  content, // content of the line
}) {
  return (
    <div className="line">
      <span className="number">{number}</span>
      <span className="content">{content ? content : " "}</span>
    </div>
  );
}
