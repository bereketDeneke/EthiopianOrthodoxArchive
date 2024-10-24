export const fetchPlaylist = async () => {
    const response = await fetch('./data/playList.json'); // Update this path
    const data = await response.json();
    return data;
  };