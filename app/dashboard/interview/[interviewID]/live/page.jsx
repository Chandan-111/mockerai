```javascript
"use client";
import React, { useEffect, useState } from "react";
import { MeetingProvider } from "@videosdk.live/react-sdk";
import { getToken, createMeeting } from "@/utils/api";
import MeetingView from "./MeetingView";

function LiveInterview({ params }) {
  const Params = React.use(params);
  const [token, setToken] = useState(null);
  const [meetingId, setMeetingId] = useState(null);

  useEffect(() => {
    const init = async () => {
      const authToken = await getToken();
      setToken(authToken);
      const id = await createMeeting(authToken);
      setMeetingId(id);
    };
    init();
  }, []);

  if (!token || !meetingId) return <div>Loading...</div>;

  return (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "Candidate",
      }}
      token={token}
    >
      <MeetingView interviewId={Params.interviewID} />
    </MeetingProvider>
  );
}

export default LiveInterview;
```
