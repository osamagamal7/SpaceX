import { useCallback, useEffect, useState } from "react";
import { RequstedLaunchDetails } from "./components/RequstedLaunchDetails/RequstedLaunchDetails";
import { ErrorMessage } from "./components/errorMessage/ErrorMessage";
import { CustomInput } from "./components/Input/Input";
import { LatestLaunchItem } from "./components/LatestLaunchItem/LatestLaunchItem";
import { ResponseType } from "./types";

export const App = () => {
  const [spacexData, setSpacexData] = useState<ResponseType[]>([]);
  const [requestedLaunch, setRequestedLaunch] = useState<ResponseType>({} as ResponseType);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let didCancel = false;
    async function getLatestLaunches() {
      if (!didCancel) {
        const response = await fetch(
          "https://api.spacexdata.com/v4/launches/past"
        );
        const data = await response.json();
        setSpacexData(data.slice(-3));
      }
    }
    getLatestLaunches();
    return () => {
      didCancel = true;
    };
  }, []);

  const getLaunchById = useCallback(async (id: string) => {
    try {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launches/${id}`
      );
      if (!response.ok) {
        throw new Error("Error Occured Please Enter A Valid ID!!");
      }
      const data = await response.json();
      setRequestedLaunch(data);
      setErrorMsg("")
      return;
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="tagLine">SpaceX</h1>
        <CustomInput getLaunchById={(id) => getLaunchById(id)} />

        {requestedLaunch.date_local && !errorMsg && (
          <RequstedLaunchDetails
            date_local={requestedLaunch.date_local}
            name={requestedLaunch.name}
            success={requestedLaunch.success}
            id={requestedLaunch.id}
          />
        )}
        {errorMsg && <ErrorMessage error={errorMsg} />}
      </div>

      <div>
        <h2 className="PastLaunchHeader">Past Launches</h2>
        {spacexData.length > 0 &&
          <LatestLaunchItem responseData={spacexData} />
        }
      </div>
    </>
  );
};
