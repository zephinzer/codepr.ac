import { DataMessage } from "interfaces/message";

export async function getUserRepositories({
  accessToken,
  mergeWith = [],
  perPage = 20,
  pageNumber = 0,
}) {
  const endpoint = new URL("https://api.github.com/user/repos");
  endpoint.searchParams.set("sort", "updated");
  endpoint.searchParams.set("direction", "desc");
  endpoint.searchParams.set("per_page", `${perPage}`);
  endpoint.searchParams.set("page", `${pageNumber}`);
  const response = await fetch(endpoint.toString(), {
    headers: { Authorization: `token ${accessToken}` },
  });
  const data = await response.json();
  if (response.status !== 200) {
    return new DataMessage({
      data: data,
      message: `received non-200 response code from '${endpoint}'`,
      isError: true,
    });
  }
  let repos = mergeWith.concat(data);
  if (data.length >= 50) {
    repos = (
      await getUserRepositories({
        accessToken,
        mergeWith: repos,
        pageNumber: pageNumber + 1,
      })
    ).data;
  }
  return new DataMessage({
    data: repos,
    message: "success",
  });
}
