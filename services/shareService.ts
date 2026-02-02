
export const encodeGameState = (data: any): string => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonString));
  } catch (e) {
    console.error("Encoding error", e);
    return "";
  }
};

export const decodeGameState = (hash: string): any => {
  try {
    const jsonString = decodeURIComponent(atob(hash));
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Decoding error", e);
    return null;
  }
};

export const getGameUrl = (hash: string): string => {
  const url = new URL(window.location.href);
  url.searchParams.set('session', hash);
  return url.toString();
};
