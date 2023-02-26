import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import sort from "../sort.js";
import Modal from '@mui/material/Modal';

function valuetext(value) {
  return value;
}

function FilterPriceResponsive() {
  const { value, handleChange, isChecked } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button onClick={handleOpen} className="button">
        Sắp xếp
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="bg-[#126E82] p-8 container mx-auto shadow-sm rounded-lg absolute inset-x-0 small-phone:top-2">
            <p className="tablet:text-3xl text-center tablet:mt-4 text-white small-phone:text-xl small-phone:m-0">
              Sắp xếp sản phẩm
            </p>
            <div className="container mx-auto big-phone:my-8 small-phone:my-4 rounded-lg">
              <div className="container mx-auto flex flex-col">
                {sort.map((radio) => (
                  <>
                    <input
                      className="sort__radio"
                      type="radio"
                      name="gender"
                      value={radio.value}
                      id={radio.id}
                      onChange={isChecked}
                      key={radio.id}
                    />
                    <label
                      htmlFor={radio.id}
                      className="sort__label small-phone:py-2"
                      key={radio._id}
                    >
                      {radio.title}
                    </label>
                  </>
                ))}
              </div>
            </div>
            <p className="text-2xl text-center my-4 text-white small-phone:text-xl">
              Kéo để chọn mức giá
            </p>
            <Box className="bg-[#D8E3E7] p-4 w-full my-4 small-phone:py-0">
              <Slider
                max={100000000}
                step={10000}
                getAriaLabel={() => "Minimum distance"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
              />
            </Box>
            <div className="container mx-auto flex flex-col items-center text-white px-4">
              <div className="flex flex-row justify-between w-full mb-4">
                <span className="pt-2">Từ</span>
                <input
                  type="text"
                  disabled
                  value={value[0].toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                  className="w-8/12 text-right"
                />
              </div>
              <div className="flex flex-row justify-between w-full">
                <span className="pt-2">Đến</span>
                <input
                  type="text"
                  disabled
                  value={value[1].toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                  className="w-8/12 text-right"
                />
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default FilterPriceResponsive;
