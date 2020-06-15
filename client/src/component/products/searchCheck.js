import React, { useContext } from "react";

import {
  Slider,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { ProductContext } from "./productContext";
export function SearchCheckBreed() {
  const { catalog, handleChangeBreed, productsTemp } = useContext(
    ProductContext
  );
  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="breed" name="breed" onChange={handleChangeBreed}>
        {catalog.map((item, index) => (
          <div key={index} style={{ display: "flex" }}>
            <FormControlLabel
              value={item.name}
              control={<Radio />}
              label={item.name}
            />
            <Chip
              label={productsTemp.filter((e) => e.breed === item.name).length}
              size="small"
              className="chip-nums"
              style={{ marginTop: "8px" }}
            />
          </div>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
export function SearchCheckSize() {
  const { handleChangeSize, productsTemp } = useContext(ProductContext);
  const sNumber = productsTemp.filter((e) => e.size === "nhỏ");
  const mNumber = productsTemp.filter((e) => e.size === "vừa");
  const lNumber = productsTemp.filter((e) => e.size === "lớn");
  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="size" name="size" onChange={handleChangeSize}>
        <div style={{ display: "flex" }}>
          <FormControlLabel value="s" control={<Radio />} label="s" />
          <Chip
            label={sNumber.length}
            size="small"
            className="chip-nums"
            style={{ marginTop: "8px" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <FormControlLabel value="m" control={<Radio />} label="m" />
          <Chip
            label={mNumber.length}
            size="small"
            className="chip-nums"
            style={{ marginTop: "8px" }}
          />
        </div>
        <div style={{ display: "flex" }}>
          <FormControlLabel value="l" control={<Radio />} label="l" />
          <Chip
            label={lNumber.length}
            size="small"
            className="chip-nums"
            style={{ marginTop: "8px" }}
          />
        </div>
      </RadioGroup>
    </FormControl>
  );
}
export function SearchCheckPrice() {
  const { valuePrice, handleChangePrice } = useContext(ProductContext);
  return (
    <div className="w-100 slide-price">
      <Slider
        value={valuePrice}
        onChange={handleChangePrice}
        valueLabelDisplay="auto"
        min={20}
        max={1500}
      />
      <span>
        £{valuePrice[0]}-£{valuePrice[1]}
      </span>
    </div>
  );
}
