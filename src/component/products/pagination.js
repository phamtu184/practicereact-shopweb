import React, { useContext } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { ProductContext } from './productContext';

export default function PaginationOutlined() {
  const { numberOfPage, currentPage, onChangeCurrentPage } = useContext(ProductContext);
  return (
    <div className='mt-2' style={{ display: 'flex' }}>
      <div className='m-auto'>
        <Pagination
          count={numberOfPage}
          page={currentPage}
          onChange={onChangeCurrentPage}
          variant="outlined"
          shape="rounded"
          showLastButton
          showFirstButton
        />
      </div>
    </div>
  );
}