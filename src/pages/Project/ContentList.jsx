import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dedupeDoubleSlashesInUrl } from "controllers/utils";
import {
  faFolderOpen,
  faFolder,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { getRepositoryContents } from "controllers/github/repository";

function handleFileSelect({
  platform,
  owner,
  repo,
  path,
  commitSha = "",
  history,
} = {}) {
  console.info(path);
  if (history) {
    window.open(
      dedupeDoubleSlashesInUrl(
        `/_/workbench/${platform}/${owner}/${repo}?path=${path}&ref=${commitSha}`
      )
    );
  }
}

function handleDirectorySelect({ directory, existingData, setData }) {
  const directories = existingData.data;
  const indexInExistingData = directories.findIndex(
    (d) => d.sha === directory.sha
  );
  if (directory.type === "dir") {
    directories.splice(indexInExistingData, 1, {
      ...directory,
      type: "expanded",
    });
  } else if (directory.type === "expanded") {
    directories.splice(indexInExistingData, 1, {
      ...directory,
      type: "dir",
    });
  }
  setData({
    ...existingData,
    data: directories,
  });
}

export default function ContentList({
  accessToken,
  platform = "github",
  owner,
  repo,
  path,
  commitSha,
  depth = 0,
}) {
  const history = useHistory();
  const [data, setData] = useState({
    error: null,
    success: null,
    data: null,
  });
  useEffect(() => {
    accessToken &&
      accessToken !== "unset" &&
      (async () => {
        console.log(`getting for path ${path}`);
        const repositoryContents = await getRepositoryContents({
          accessToken,
          owner,
          repo,
          path,
          ref: commitSha,
        });
        setData(
          repositoryContents.isError
            ? {
                error: repositoryContents.message,
                success: false,
              }
            : {
                error: null,
                data: repositoryContents.data,
                success: true,
              }
        );
      })();
  }, [accessToken]);
  let files, directories;
  if (data.success === true) {
    files = data.data.filter((l) => l.type === "file");
    directories = data.data.filter(
      (l) => l.type === "dir" || l.type === "expanded"
    );
  }
  return data.success === false ? (
    <div className="content-load-error"></div>
  ) : data.success === null ? (
    <div className="content-loading"></div>
  ) : (
    <ul className="content-list">
      {files.map((listing, index) => (
        <FileItem
          platform={platform}
          owner={owner}
          repo={repo}
          path={path}
          key={index}
          depth={depth}
          data={listing}
          commitSha={commitSha}
        />
      ))}
      {directories.map((listing) =>
        listing.type === "dir" ? (
          <DirItem
            depth={depth}
            existingData={data}
            listing={listing}
            setData={setData}
          />
        ) : (
          [
            <DirItem
              depth={depth}
              existingData={data}
              listing={listing}
              setData={setData}
            />,
            <ContentList
              key={`expanded-${depth}-${listing.type}-${listing.sha}`}
              accessToken={accessToken}
              platform={platform}
              owner={owner}
              repo={repo}
              path={path + `/${listing.name}`}
              commitSha={commitSha}
              depth={depth + 1}
            />,
          ]
        )
      )}
    </ul>
  );
}

function DirItem({ depth, existingData, listing, setData }) {
  return (
    <li
      key={`${depth}-${listing.type}-${listing.sha}`}
      onClick={() =>
        handleDirectorySelect({
          directory: listing,
          existingData,
          setData,
        })
      }
    >
      <span className="type" key="icon">
        {listing.type === "dir" ? (
          <i className="dir">
            <FontAwesomeIcon icon={faFolder} inverse fixedWidth />
          </i>
        ) : (
          <i className="dir">
            <FontAwesomeIcon icon={faFolderOpen} inverse fixedWidth />
          </i>
        )}
      </span>
      <span className="name" key="label">
        {listing.name}
      </span>
    </li>
  );
}

function FileItem({ platform, owner, repo, path, commitSha, data }) {
  return (
    <li
      onClick={() =>
        handleFileSelect({
          platform,
          owner,
          repo,
          path: `${path}/${data.name}`,
          commitSha,
          history,
        })
      }
    >
      <span className="type">
        <i className="file">
          <FontAwesomeIcon icon={faFile} inverse fixedWidth />
        </i>
      </span>
      <span className="name">{data.name}</span>
    </li>
  );
}
