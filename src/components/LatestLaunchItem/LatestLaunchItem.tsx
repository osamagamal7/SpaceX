import React from "react";
import { ResponseType } from "../../types";
import "./LatestLaunchItem.css"

type LatestLaunchItemProps = {
  responseData: ResponseType[]
}

export const LatestLaunchItem: React.FC<LatestLaunchItemProps> = ({ responseData }) => {
  return (
    <ul className="grid">
      {responseData.map((item) => (
        <div key={item.id} className="latestLaunches">
          <img className="img-responsive" src="https://cdnuploads.aa.com.tr/uploads/Contents/2022/07/15/thumbs_b_c_6d5a070c0e2d051dedf1248f0310085a.jpg?v=082836" alt="img" />
          <li>{item.name}</li>
          <p className="id">{item.id}</p>
        </div>
      ))}
    </ul>

  );
}

