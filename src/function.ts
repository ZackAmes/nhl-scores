export const getServerData = async () => {
    const response = await fetch('https://nhl-score-api.herokuapp.com/api/scores/latest');
    const data = await response.json();
    console.log(data);
    return data;
};