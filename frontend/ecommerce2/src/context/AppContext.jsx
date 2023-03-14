import { createContext, useState } from "react";
import { useSelector } from "react-redux";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const articles = useSelector((state) => state.articles);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState([0, 100000000]);
  const [page, setPage] = useState(1);
  const [gender, setGender] = useState("newest");
  const [viewedProducts, setViewedProducts] = useState([]);
  const [favProducts, setFavProducts] = useState([]);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [number, setNumber] = useState("");
  const [chosenProvince, setChosenProvince] = useState("");
  const [chosenDistrict, setChosenDistrict] = useState("");
  const [chosenWard, setChosenWard] = useState("");

  const isChecked = (e) => {
    setGender(e.target.value);
  };

  const count = Math.ceil(
    products.filter(
      (filteredProduct) =>
        value[0] / 24000 <= filteredProduct.price &&
        filteredProduct.price <= value[1] / 24000
    ).length / 8
  );

  const minDistance = 100000;

  const changeIndex = (event, index) => {
    setPage(index);
  };

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
    if (count === 1) {
      setPage(count);
    } else {
      setPage(count - 1);
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  const sortPrice = (a, b) => {
    if (a.price < b.price) {
      return -1;
    }
    if (a.price > b.price) {
      return 1;
    }
    return 0;
  };

  const sortAlphabet = (a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  };

  const convert = (string) => {
    const convertString = string
      .toLocaleLowerCase()
      .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
      .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
      .replace(/ì|í|ị|ỉ|ĩ/g, "i")
      .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
      .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
      .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
      .replace(/đ/g, "d")
    return convertString;
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        articles,
        user,
        products,
        value,
        setValue,
        handleChange,
        page,
        changeIndex,
        count,
        resetPage,
        gender,
        isChecked,
        sortPrice,
        sortAlphabet,
        viewedProducts,
        setViewedProducts,
        number,
        setNumber,
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
        chosenWard,
        setChosenWard,
        favProducts,
        setFavProducts,
        convert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
