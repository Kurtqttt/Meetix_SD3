import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export const useGetCallById = (id: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setisCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        const filterConditions = Array.isArray(id)
          ? { id: { $in: id } }
          : { id };

        const { calls } = await client.queryCalls({
          filter_conditions: filterConditions,
        });

        if (calls.length > 0) setCall(calls[0]);
      } catch (error) {
        console.error("Error querying calls:", error);
      } finally {
        setisCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return { call, isCallLoading };
};
