import React, { useState } from 'react';

import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography,
  Radio, RadioGroup, FormControlLabel  } from '@material-ui/core';

export default function SearchBar(){
  const [expandedPrice, setExpandedPrice] = useState(true);
  const [expandedSize, setExpandedSize] = useState(true);
  const [expandedType, setExpandedType] = useState(true);
  
  const handleChangePrice = () => {
    setExpandedPrice(!expandedPrice);
  };
  const handleChangeSize = () => {
    setExpandedSize(!expandedSize);
  };
  const handleChangeType = () => {
    setExpandedType(!expandedType);
  };

  return (
    <div>
      <ExpansionPanel square expanded={expandedPrice} onChange={handleChangePrice}>
        <ExpansionPanelSummary>
          <Typography color='primary' variant='body1'>Lọc theo giá</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GroupRadioPrice/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expandedSize} onChange={handleChangeSize}>
        <ExpansionPanelSummary>
          <Typography>Lọc theo kích thước</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GroupRadioSize/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel square expanded={expandedType} onChange={handleChangeType}>
        <ExpansionPanelSummary>
          <Typography>Lọc theo giống</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <GroupRadioType/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

function GroupRadioPrice(){
  const [price, setPrice] = useState('');
  const radioGroupPrice = event => {
    setPrice(event.target.value);
  };
  return(
    <RadioGroup value={price} onChange={radioGroupPrice}>
      <FormControlLabel value="female" control={<Radio size='small' />} label="Dưới 3 triệu" />
      <FormControlLabel value="male" control={<Radio size='small' />} label="3-7 triệu" />
      <FormControlLabel value="other" control={<Radio size='small' />} label="Trên 7 triệu" />
    </RadioGroup>
  )
}
function GroupRadioSize(){
  const [size, setSize] = useState('');
  const radioGroupSize = event => {
    setSize(event.target.value);
  };
  return(
    <RadioGroup value={size} onChange={radioGroupSize}>
      <FormControlLabel value="s" control={<Radio size='small' />} label="S" />
      <FormControlLabel value="m" control={<Radio size='small' />} label="M" />
      <FormControlLabel value="l" control={<Radio size='small' />} label="L" />
    </RadioGroup>
  )
}
function GroupRadioType(){
  const [type, setType] = useState('');
  const radioGroupType = event => {
    setType(event.target.value);
  };
  return(
    <RadioGroup value={type} onChange={radioGroupType}>
      <FormControlLabel value="Pug" control={<Radio size='small' />} label="Pug" />
      <FormControlLabel value="Husky" control={<Radio size='small' />} label="Husky" />
      <FormControlLabel value="Chow chow" control={<Radio size='small' />} label="Chow chow" />
      <FormControlLabel value="Poodle" control={<Radio size='small' />} label="Poodle" />
    </RadioGroup>
  )
}