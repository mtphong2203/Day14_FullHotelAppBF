import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getData() {
    return [
      {
        title: 'Superior Room',
        size: '23m2',
        bed: '2 beds',
        bathroom: '1 bathroom',
        description: 'Phòng ngủ ấm cúng, tiện nghi và hợp túi tiền',
        image: './assets/images/room01.jpg',
      },
      {
        title: 'Connecting Room',
        size: '53m2',
        bed: '3 beds',
        bathroom: '2 bathroom',
        description: 'Lựa chọn lý tưởng cho gia đình hoặc bạn bè',
        image: './assets/images/room02.jpg',
      },
      {
        title: 'Deluxe family',
        size: '32m2',
        bed: '2 beds',
        bathroom: '1 bathroom',
        description: 'Lựa chọn hoàn hảo cho gia đình có trẻ nhỏ',
        image: './assets/images/room03.jpg',
      },
      {
        title: 'Deluxe Room',
        size: '25m2',
        bed: '2 beds',
        bathroom: '1 bathroom',
        description: 'ận hưởng khung cảnh núi non hùng vĩ',
        image: './assets/images/room04.jpg',
      },
    ]
  }

  getEvent() {
    return [
      {
        image: './assets/images/event-1.jpg',
        title: 'News',
        description: 'Top 10 khách sạn 5 sao Sapa cho kỳ nghỉ sang trọng, thư giãn',
      },
      {
        image: './assets/images/event-2.jpg',
        title: 'News',
        description: 'Nên đi Sapa vào tháng mấy? Gợi ý thời gian lý tưởng để khám Sapa',
      },
      {
        image: './assets/images/event-3.jpg',
        title: 'Những địa điểm nên đến ở SaPa',
        description: 'Quảng trường Sapa – Nơi giao thoa giữa truyền thống và hiện đại',
      },
      {
        image: './assets/images/event-4.jpg',
        title: 'Những địa điểm nên đến ở SaPa',
        description: 'Ăn sáng ở Sapa – 10 Quán ăn sáng không thể bỏ qua tại Sapa',
      },
      {
        image: './assets/images/event-5.jpg',
        title: 'Những địa điểm nên đến ở SaPa',
        description: 'Chụp ảnh Sapa – 12 Điểm check in không thể bỏ qua tại Sapa',
      },
      {
        image: './assets/images/event-6.jpg',
        title: 'News',
        description: 'Giá vé cao tốc Hà Nội Lào Cai: Thông tin cập nhật 2023',
      },
    ]
  }
}
