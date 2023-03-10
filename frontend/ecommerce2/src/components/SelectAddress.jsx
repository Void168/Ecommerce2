import React, { useEffect, useContext } from "react";
import axios from "../axios";
import { AppContext } from "../context/AppContext";

function SelectAddress() {
  const {
    province,
    setProvince,
    district,
    setDistrict,
    ward,
    setWard,
    chosenProvince,
    setChosenProvince,
    chosenDistrict,
    setChosenDistrict,
    setChosenWard,
    number,
    setNumber,
  } = useContext(AppContext);

  useEffect(() => {
    const provinceFetch = async () => {
      axios.get("https://vapi.vnappmob.com/api/province/").then(({ data }) => {
        setProvince(data.results);
      });
    };
    provinceFetch();
  }, [setProvince]);

  const filterDistrict = province?.find(
    (x) => x.province_name === chosenProvince
  );

  useEffect(() => {
    const districtFetch = async () => {
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/district/${filterDistrict?.province_id}`
        )
        .then(({ data }) => {
          setDistrict(data.results);
        });
    };
    districtFetch();
  }, [filterDistrict?.province_id, setDistrict]);

  const filterWard = district?.find((x) => x.district_name === chosenDistrict);

  useEffect(() => {
    const districtFetch = async (province_id) => {
      axios
        .get(
          `https://vapi.vnappmob.com/api/province/ward/${filterWard?.district_id}`
        )
        .then(({ data }) => {
          setWard(data.results);
        });
    };
    districtFetch();
  }, [filterWard?.district_id, setWard]);

  return (
    <div>
      <div>
        <label>Số nhà</label>
        <input
          className="w-full"
          type="text"
          placeholder="Nhập số nhà"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <div>
        <label>Tỉnh thành</label>
        <select
          className="text-black"
          onChange={(e) => setChosenProvince(e.target.value)}
        >
          <option value="">-- Chọn Tỉnh/Thành --</option>
          {province.map((province) => (
            <option value={province.province_name} key={province.province_id}>
              {province.province_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Quận/Huyện</label>
        <select onChange={(e) => setChosenDistrict(e.target.value)}>
          <option value="">-- Chọn Quận/Huyện --</option>
          {district.map((name) => (
            <option value={name.district_name} key={name.district_id}>
              {name.district_name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Phường/Xã</label>
        <select onChange={(e) => setChosenWard(e.target.value)}>
          <option value="">-- Chọn Phường/Xã --</option>
          {ward.map((ward) => (
            <option value={ward.ward_name} key={ward.ward_id}>
              {ward.ward_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SelectAddress;
