export const fetchArchivesData = async () => {
    const response = await fetch('./data/archives.json'); 
    const data = await response.json();
    return data;
};
