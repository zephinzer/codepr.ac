import {DataMessage} from 'interfaces/message';

export async function getSelf({accessToken}) {
  const endpoint = 'https://api.github.com/user';
  const response = await fetch(endpoint, {
    headers: {'Authorization': `token ${accessToken}`},
  });
  const data = await response.json();
  if(response.status !== 200) {
    return new DataMessage({
      data: data,
      message: `received non-200 response code from '${endpoint}'`,
      isError: true,
    });
  }
  return new DataMessage({
    data: data,
    message: 'success',
  });
}