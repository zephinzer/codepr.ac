import { DataMessage } from "interfaces/message";
import { dedupeDoubleSlashesInUrl } from "controllers/utils";

export async function getFileContent({
  accessToken, // user's github access token
  owner, // repo owner
  repo, // repo path
  path, // path to file
  ref, // commitsha
}) {
  const endpoint = new URL(
    dedupeDoubleSlashesInUrl(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${ref}`
    )
  );
  const response = await fetch(endpoint.toString(), {
    headers: { Authorization: `token ${accessToken}` },
  });
  const data = await response.json();
  if (response.status !== 200) {
    return new DataMessage({
      data,
      message: `received non-200 response code from '${endpoint}'`,
      isError: true,
    });
  }
  return new DataMessage({
    data,
    message: "success",
  });
}
