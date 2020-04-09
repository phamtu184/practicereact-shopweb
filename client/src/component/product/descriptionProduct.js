import React from 'react';
import DetailImg from '../../image/background/detail.jpg';

export default function DescriptionProduct() {

  return (
    <div className='row'>
      <div className='col-lg-6 detail-tab-desc'>
        <p>Có thân hình chắc lẳn, gọn gàng, Cơ thể của loài chó này được coi là cân đối nếu chiều cao tính đến vai gần tương đương với chiều dài từ vai đến hết mông.</p>
        <ul>
          <li>Rất thích hợp cho các căn hộ có diện tích vừa phải. Tốt nhất là nên giữ chúng ở trong nhà, nơi có nhiệt độ thích hợp.</li>
          <li>Chúng có đôi mắt tròn lồi màu sẫm và hàm dưới hơi trề ra rất ngộ. Đuôi thẳng hoặc xoắn. Chăm sóc thích hợp của các nếp nhăn là quan trọng nhất.</li>
        </ul>
      </div>
      <div className='col-lg-6'>
        <img src={DetailImg} alt='DetailImg' />
      </div>
    </div>
  )
}