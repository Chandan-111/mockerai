export const getToken = async () => {
    const response = await fetch('/api/videosdk/token');
    const data = await response.json();
    return data.token;
};

export const createMeeting = async (token) => {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
            authorization: `${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
    });
    const { roomId } = await res.json();
    return roomId;
};
