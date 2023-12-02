"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [singleValue, setSingleValue] = useState({ stock: "" });
  const [totalData, setTotalData] = useState([]);

  useEffect(() => {
    if (singleValue?.result?.price)
      setSelectedPrice(singleValue?.result?.price);
  }, [singleValue]);

  useEffect(() => {
    setdata(selectedValue);
  }, [selectedValue]);

  const setdata = (value) => {
    if (value !== "") {
      const myInterval = setInterval(() => {
        fetchSingleData(`/api/getStockPrice?stockNameId=${value}`);
        console.log(value, singleValue?.stock);
        if (value !== singleValue?.stock) {
          clearInterval(myInterval);
        }
      }, 5000);
    }
  };

  const fetchData = async (url) => {
    let data = await fetch(url)
      .then((result) => result.json())
      .then((res) => res)
      .catch((e) => e);
    return data;
  };

  const handleChange = async (event) => {
    let { value } = event.target;
    setSelectedValue(value);
  };

  const fetchSingleData = async (url) => {
    const data = await fetchData(url);
    setSingleValue(data);
  };

  const fetchAllData = async () => {
    const fullData = await fetchData(`/api/getStockPrice`);
    setTotalData(fullData);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <main>
      <h1>
        The price of{" "}
        {singleValue?.result?.stockNameId
          ? singleValue?.result?.stockNameId?.toUpperCase()
          : ""}{" "}
        is{" "}
        <span
          style={{
            color: singleValue?.result?.price > selectedPrice ? "red" : "green",
          }}
        >
          {" "}
          {singleValue?.result?.price
            ? singleValue?.result?.price
            : selectedPrice}{" "}
        </span>
      </h1>
      <select
        value={selectedValue}
        label="Select an option"
        onChange={handleChange}
      >
        <option value="">None</option>
        {totalData?.length &&
          totalData?.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <option value={item?._id} key={index}>
              {item?.stockNameId?.toUpperCase()}
            </option>
          ))}
      </select>
    </main>
  );
}
