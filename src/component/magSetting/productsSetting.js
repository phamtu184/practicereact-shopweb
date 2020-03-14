import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, TextField, CircularProgress, Snackbar, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

const CssTextField = withStyles({
  root: {
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        color: 'black'
      },
      '&:hover fieldset': {
        borderColor: '#40c4ff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#4285F4',
      },
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline' : {
      borderColor: '#ff6565'
    },
    '& .MuiFormHelperText-root.Mui-error' : {
      color: '#ff6565'
    }
  },
})(TextField);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductsSetting(props){
  const [name, setName] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [description, setDescription] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [price, setPrice] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [size, setSize] = useState({
    value: "Nhỏ",
    valid: true,
    errorMessage: ""
  });
  const [type, setType] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [gender, setGender] = useState({
    value: "Đực",
    valid: true,
    errorMessage: ""
  });
  const [images, setImages] = useState({
    value: "",
    valid: true,
    errorMessage: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [infoSnackbar, setInfoSnackbar] = useState('');
  const [typeSnackbar, setTypeSnackbar] = useState('');
  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  const onChangeName = (event)=> {
    setName({
      value: event.target.value,
    })
  }
  const onChangeDescription = (event)=> {
    setDescription({
      value: event.target.value,
    })
  }
  const onChangePrice = (event)=> {
    const regexp = /^[0-9]+$/;
    const checkingResult = regexp.exec(event.target.value);
    setPrice({
      value: event.target.value,
      valid: !!event.target.value && checkingResult !== null,
      errorMessage: price.valid ? "" : "Giá chỉ chứa số"
    })
  }
  const onChangeSize = (event)=> {
    setSize({ 
      value: event.target.value,
    });
  }
  const onChangeType = (event)=> {
    setType({ 
      value: event.target.value,
    });
  }
  const onChangeGender = (event)=> {
    setGender({ 
      value: event.target.value,
    });
  }
  
  function formValid(arr1, arr2, arr3, arr4, arr5, arr6, arr7){
    let arrs = [arr1, arr2, arr3, arr4, arr5, arr6, arr7]
    let valid = true;
    for(let i = 0; i<arrs.length; i++){
      if(arrs[i]===false){
        valid = false;
        break
      }
    }
    return valid
  }
  
  function nullFormValid(arr1, arr2, arr3, arr4, arr5, arr6, arr7){
    let arrs = [arr1, arr2, arr3, arr4, arr5, arr6, arr7]
    let valid = true;
    for(let i = 0; i<arrs.length; i++){
      if(arrs[i]===''){
        valid = false;
        break
      }
    }
    return valid
  }
  
  const onChangeImages = (event)=> {
    let reader = new FileReader();
    let files = event.target.files;
    reader.readAsDataURL(files[0]);
    reader.onload = (e) =>{
      files = e.target.result
      setImages({ 
        value: files,
      });
    }
  }
  const onSubmitRegister = (event)=> {
    event.preventDefault();
    setIsLoading(true);
    const info = {
      name: name.value,
      description: description.value,
      price: price.value,
      size: size.value,
      type: type.value,
      gender: gender.value,
      images: images.value
    }
    if (formValid(name.valid, description.valid,
      price.valid, size.valid, type.valid,
      gender.valid, images.valid)
        && nullFormValid(name.value, description.value,
          price.value, size.value, type.value,
          gender.value, images.value)){
      axios.post("/product/product", info)
      .then(res => {
        if(res.data==='ADDED_PRODUCT'){
          setOpenSnackbar(true);
          setInfoSnackbar('Nhập sản phẩm thành công');
          setTypeSnackbar('success');
          setIsLoading(false);
          setName({value:''});
          setDescription({value:''});
          setPrice({value:''});
          setType({value:''});
          setImages({value:''});
        }
        else{
          setOpenSnackbar(true);
          setInfoSnackbar('Nhập sản phẩm tb');
          setTypeSnackbar('error');
          setIsLoading(false);
        }
        
      })
    }
    else{
      setOpenSnackbar(true);
      setInfoSnackbar('Vui lòng nhập đầy đủ các trường');
      setTypeSnackbar('warning');
      setIsLoading(false);
    }
  }
  const vertical = 'top';
  const horizontal = 'right';
  return(
    <>
      <Snackbar open={openSnackbar} autoHideDuration={6000} 
      onClose={closeSnackbar} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={closeSnackbar} severity={typeSnackbar}>
          {infoSnackbar}
        </Alert>
      </Snackbar>
      <Card className="card-product m-auto w-75">
        <CardContent className="mx-4">
          <div className="text-center">
            <h3 className="mb-4">
              <strong>Nhập sản phẩm mới</strong>
            </h3>
          </div>
          <form onSubmit={onSubmitRegister} autoComplete='nope'>
            <CssTextField 
              autoComplete='off'
              variant="outlined"
              label="Tên"
              type="text"
              onChange={onChangeName}
              value={name.value}
              fullWidth
              error={name.valid===false}
              helperText={name.valid===false ? name.errorMessage:''}
            />
            <CssTextField
              variant="outlined"
              label="Miêu tả"
              type="text"
              onChange={onChangeDescription}
              value={description.value}
              fullWidth
              className='mt-3'
              error={description.valid===false}
              helperText={description.valid===false ? description.errorMessage:''}
            />
            <CssTextField
              variant="outlined"
              label="Giá"
              type="text"
              onChange={onChangePrice}
              value={price.value}
              fullWidth
              className='mt-3'
              error={price.valid===false}
              helperText={price.valid===false ? price.errorMessage:''}
            />
            <CssTextField
              variant="outlined"
              label="Giống"
              type="text"
              onChange={onChangeType}
              value={type.value}
              fullWidth
              className='mt-3'
              error={type.valid===false}
              helperText={type.valid===false ? type.errorMessage:''}
            />   
            <FormControl variant="outlined" className='mt-3' fullWidth>
              <InputLabel >
                Kích thước
              </InputLabel>
              <Select
                value={size.value}
                onChange={onChangeSize}
              >
                <MenuItem value='Nhỏ'>Nhỏ</MenuItem>
                <MenuItem value='Vừa'>Vừa</MenuItem>
                <MenuItem value='Lớn'>Lớn</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="outlined" className='mt-3' fullWidth>
              <InputLabel>
              Giới tính
              </InputLabel>
              <Select
                value={gender.value}
                onChange={onChangeGender}
              >
                <MenuItem value='Đực'>Đực</MenuItem>
                <MenuItem value='Cái'>Cái</MenuItem>
              </Select>
            </FormControl>
            <div className='mt-3'> 
              <Button
                variant="contained"
                component="label"
              >
                Tải hình
                <input
                  type="file"
                  style={{ display: "none" }}
                  onChange={onChangeImages}
                />
              </Button>
              {images.value ?
                <img src={images.value} alt='s'
                  style={{width:'200px', height:'150px'}}
                  className='ml-2'
                />:''
              }
            </div>
            <div className="text-center mb-3">
              <Button
                type="submit"
                gradient="blue"
                className="btn-block z-depth-1a mt-4"
                disabled={isLoading}
                color='primary'
              >
                { isLoading && <CircularProgress size={16} color="inherit" className="middle"/> }
                <span className="ml-2">Click</span> 
              </Button> 
            </div>
          </form> 
        </CardContent>
      </Card>
    </>
  )
}