import { useEffect, useState } from "react";
import contriesService from "../../api/countries";
import React from "react";

export default function HomePage() {


  const [contries, setContries] = useState<any>([]);

  useEffect(() => {

    const fetchData = async () => {
      const data = await contriesService.getAll();
      setContries(data);
      return data;
    }

    fetchData();


  }, [])
  return (
    <React.Fragment>
      <h1>Welcom to home page</h1>
      <div>
        {contries.map((x: any) =>
          <p key={x.name.common}>{x.name.common}</p>
        )}
      </div>
    </React.Fragment>
  );
}
