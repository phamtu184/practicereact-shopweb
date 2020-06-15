import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import url from "../../config/url";
const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
        color: "black",
      },
      "&:hover fieldset": {
        borderColor: "#40c4ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4285F4",
      },
    },
    "& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ff6565",
    },
    "& .MuiFormHelperText-root.Mui-error": {
      color: "#ff6565",
    },
  },
})(TextField);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Catalog(props) {
  const [catalog, setCatalog] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("");
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const onChangeCatalog = (event) => {
    setCatalog(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(`${url.LOCAL}/product/catalog`, { catalog })
      .then((res) => {
        if (res.status === 200) {
          setOpenSnackbar(true);
          setInfoSnackbar("Nhập sản catalog thành công");
          setTypeSnackbar("success");
          setIsLoading(false);
          setCatalog("");
        }
      })
      .catch((e) => {
        setOpenSnackbar(true);
        setInfoSnackbar("Nhập catalog thất bại");
        setTypeSnackbar("error");
        setIsLoading(false);
      });
  };
  const vertical = "top";
  const horizontal = "right";
  return (
    <>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={closeSnackbar} severity={typeSnackbar}>
          {infoSnackbar}
        </Alert>
      </Snackbar>
      <Card className="card-product m-auto w-75">
        <CardContent className="mx-4">
          <div className="text-center">
            <h3 className="mb-4">
              <strong>Thêm catalog</strong>
            </h3>
          </div>
          <form onSubmit={onSubmit} autoComplete="nope">
            <CssTextField
              autoComplete="off"
              variant="outlined"
              label="Tên"
              type="text"
              onChange={onChangeCatalog}
              value={catalog.value}
              fullWidth
              required
            />
            <div className="text-center mb-3">
              <Button
                type="submit"
                gradient="blue"
                className="btn-block z-depth-1a mt-4"
                disabled={isLoading}
                color="primary"
              >
                {isLoading && (
                  <CircularProgress
                    size={16}
                    color="inherit"
                    className="middle"
                  />
                )}
                <span className="ml-2">Click</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
