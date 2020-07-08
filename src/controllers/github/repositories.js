import { DataMessage } from "interfaces/message";

export async function getUserRepositories({
  accessToken, // user's github access token
  getAll = false, // when set to true, this will retrieve all repos if pageNumber === 0
  mergeWith = [], // use this to merge with an existing list of repos
  perPage = 20, // number of repos on the page
  pageNumber = 0, // 1-based index of page of repos
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
  if (getAll && data.length >= perPage) {
    repos = (
      await getUserRepositories({
        accessToken,
        getAll,
        mergeWith: repos,
        pageNumber: pageNumber + 1,
        perPage,
      })
    ).data;
  }
  return new DataMessage({
    data: repos,
    message: "success",
  });
}
