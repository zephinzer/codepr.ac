import { DataMessage } from "interfaces/message";
import { dedupeDoubleSlashesInUrl } from "controllers/utils";

export async function getRepository({ accessToken, owner, repo }) {
  const endpoint = new URL(`https://api.github.com/repos/${owner}/${repo}`);
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

export async function getRepositoryCommits({ accessToken, owner, repo }) {
  const endpoint = new URL(
    `https://api.github.com/repos/${owner}/${repo}/commits`
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

export async function getRepositoryContents({
  accessToken,
  owner,
  repo,
  path = "",
  ref,
}) {
  const endpoint = new URL(
    dedupeDoubleSlashesInUrl(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`
    )
  );

  if (ref) endpoint.searchParams.set("ref", ref);
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
