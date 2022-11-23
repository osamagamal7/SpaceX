import React, { useEffect, useState } from "react";
import "./RequstedLaunchDetails.css"
import "../../normalize.css"

type timerProps = {
  hrs: string | number;
  mins: string | number;
  secs: string | number;
};
type RequstedLaunchDetailsProps = {
  date_local: string;
  name: string;
  success: boolean | undefined;
  id: string | undefined
};

export const RequstedLaunchDetails: React.FC<RequstedLaunchDetailsProps> = ({
  date_local,
  name,
  success,
  id
}) => {
  const [timer, setTimer] = useState<timerProps>({
    hrs: 0,
    mins: 0,
    secs: 0,
  });
  let seconds: number = (+new Date() - new Date(date_local).getTime()) / 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      seconds++;

      let hrs: string | number = Math.floor(seconds / 3600);
      let mins: string | number = Math.floor((seconds - hrs * 3600) / 60);
      let secs: string | number = seconds % 60;

      if (secs < 10) secs = "0" + secs;
      if (hrs < 10) hrs = "0" + hrs;
      if (mins < 10) mins = "0" + mins;

      setTimer((prevState) => ({
        ...prevState,
        hrs,
        mins,
        secs,
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="container">
      <div className="detailsContainer">
        <div className="heading">
          <h3>{name}</h3>
          {<div className="indicator" style={{ backgroundColor: success ? "green" : "red" }}></div>}
        </div>
        <div className="timerContainer">
          <div>
            <p>Elapsed Time Since Launch:</p>
            {timer.hrs > 0 && (
              <h3>{timer.hrs + ":" + timer.mins + ":" + Math.floor(+timer.secs)}</h3>
            )}
          </div>
          <p className="id">#ID: {id}</p>
        </div>
      </div>
    </div>
  );
};
