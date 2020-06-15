import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  SwipeableDrawer,
  useMediaQuery,
  IconButton,
  Paper,
  Button,
} from "@material-ui/core";
import { ProductContext } from "./productContext";
import MenuIcon from "../../image/svglogo/menu.svg";

import {
  SearchCheckSize,
  SearchCheckBreed,
  SearchCheckPrice,
} from "./searchCheck";

const DivSearchBar = styled.div`
  .search-bar-paper {
    padding: 20px;
    span {
      text-transform: capitalize;
    }
    .search-bar-label {
      position: relative;
      display: flex;
      align-items: center;
      .color-span {
        color: #555;
      }
      .chip-nums {
        position: absolute;
        right: 0;
      }
    }
    .MuiCheckbox-root {
      padding: 5px;
    }
    h5 {
      border-bottom: 1px solid #e5e5e5;
      font-weight: 700;
      font-size: 16px;
      text-transform: uppercase;
      margin-top: 0;
      padding-bottom: 10px;
      margin-bottom: 20px;
      font-family: "Dosis", sans-serif;
    }
    .Mui-checked {
      color: #1e88e5 !important;
    }
    .slide-price {
      .MuiSlider-root {
        color: #1976d2;
      }
    }
    label {
      display: block;
      margin-left: -11px;
    }
  }
`;
export default function SearchBar() {
  const [drawer, setDrawer] = useState(false);
  const clickOpenDrawer = () => {
    setDrawer(true);
  };
  const clickCloseDrawer = () => {
    setDrawer(false);
  };

  const matches = useMediaQuery("(max-width:992px)");
  return (
    <>
      {matches ? (
        <>
          <IconButton onClick={clickOpenDrawer}>
            <img
              src={MenuIcon}
              alt="Menu icon"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
          <SwipeableDrawer
            open={drawer}
            onOpen={clickOpenDrawer}
            onClose={clickCloseDrawer}
            anchor="left"
          >
            <Expanded />
          </SwipeableDrawer>
        </>
      ) : (
        <Expanded />
      )}
    </>
  );
}

function Expanded() {
  const { reset, filterProducts } = useContext(ProductContext);
  return (
    <DivSearchBar>
      <Paper className="search-bar-paper">
        <div className="mb-2">
          <h5>Lọc theo kích thước</h5>
          <SearchCheckSize />
        </div>
        <div className="mb-4">
          <h5>Lọc theo giống</h5>
          <SearchCheckBreed />
        </div>
        <div>
          <h5>Lọc theo giá</h5>
          <SearchCheckPrice />
        </div>
        <div>
          <Button
            onClick={filterProducts}
            style={{
              color: "white",
              backgroundColor: "#1e88e5",
              marginTop: "15px",
            }}
          >
            Lọc
          </Button>
          <Button
            onClick={reset}
            style={{
              color: "#1e88e5",
              backgroundColor: "white",
              marginTop: "15px",
              marginLeft: "10px",
              border: "1px solid #1e88e5",
            }}
          >
            Nhập lại
          </Button>
        </div>
      </Paper>
    </DivSearchBar>
  );
}
