"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState({});
  const [totalData, setTotalData] = useState([]);

  const handleChange = async (event) => {
    const data = await fetch(
      `/api/getStockPrice?stock_name=${event.target.value}`
    )
      .then((result) => result.json())
      .then((res) => res)
      .catch((e) => e);

    setSelectedValue(data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchAllData = async () => {
      const finalData = await fetch(`/api/getStockPrice`)
        .then((result) => result.json())
        .then((res) => res)
        .catch((e) => e);
      setTotalData(finalData);
    };
    fetchAllData();
  }, []);

  return (
    <main>
      {selectedValue?.stock ? (
        <h1>
          My Stock is {selectedValue?.stock?.toUpperCase()} and Stock price is{" "}
          {selectedValue?.price}
        </h1>
      ) : (
        ""
      )}
      <select
        value={selectedValue?.stock}
        label="Select an option"
        onChange={handleChange}
      >
        <option value="">None</option>
        {totalData?.length &&
          totalData?.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <option value={item?.stock} key={index}>
              {item?.stock?.toUpperCase()}
            </option>
          ))}
      </select>
    </main>
  );
}
