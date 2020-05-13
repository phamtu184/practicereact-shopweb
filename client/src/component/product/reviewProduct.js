import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button, Avatar, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.23)",
        color: "black",
      },
      "&:hover fieldset": {
        borderColor: "#40c4ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#4285F4",
      },
    },
  },
})(TextField);
const labels = {
  1: "Tệ",
  2: "Kém",
  3: "Ổn",
  4: "Tốt",
  5: "Xuất sắc",
};
export default function ReviewProduct(props) {
  const [value, setValue] = useState(5);
  const [hover, setHover] = useState(-1);
  const { submitReview, reviewValue, handleChangeReviewValue, product } = props;

  return (
    <div className="review-product">
      <div className="">
        <label>Đánh giá của bạn</label>
        <div className="product-rating">
          <Rating
            name="size-small"
            defaultValue={value}
            size="large"
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            className="mb-3"
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {value !== null && (
            <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </div>
        <CssTextField
          label="Đánh giá"
          multiline
          rows="4"
          fullWidth
          variant="outlined"
          value={reviewValue}
          onChange={handleChangeReviewValue}
        />
        <Button
          className="mt-2"
          onClick={() => submitReview(value, reviewValue)}
        >
          Đăng
        </Button>
      </div>
      <div>
        {product.comment.items.map((item, index) => {
          const d = new Date(item.date);
          const ye = new Intl.DateTimeFormat("vi", {
            year: "numeric",
          }).format(d);
          const mo = new Intl.DateTimeFormat("vi", {
            month: "short",
          }).format(d);
          const da = new Intl.DateTimeFormat("vi", {
            day: "2-digit",
          }).format(d);
          return (
            <div key={index} className="user-review mt-4">
              <div className="avatar">
                <Avatar>{item.name.charAt(0)}</Avatar>
              </div>
              <div className="comment-text">
                <Rating
                  defaultValue={item.star}
                  size="small"
                  className="mb-3"
                  readOnly
                />
                <p>
                  <strong>{item.name}</strong> - {da} {mo} {ye}
                </p>
                <p>{item.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
