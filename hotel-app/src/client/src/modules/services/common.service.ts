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
        images: './assets/images/room01.jpg',
      },
      {
        title: 'Connecting Room',
        size: '53m2',
        bed: '3 beds',
        bathroom: '2 bathroom',
        description: 'Lựa chọn lý tưởng cho gia đình hoặc bạn bè',
        images: './assets/images/room02.jpg',
      },
      {
        title: 'Deluxe family',
        size: '32m2',
        bed: '2 beds',
        bathroom: '1 bathroom',
        description: 'Lựa chọn hoàn hảo cho gia đình có trẻ nhỏ',
        images: './assets/images/room03.jpg',
      },
      {
        title: 'Deluxe Room',
        size: '25m2',
        bed: '2 beds',
        bathroom: '1 bathroom',
        description: 'Tận hưởng khung cảnh núi non hùng vĩ',
        images: './assets/images/room04.jpg',
      },
    ]
  }

  getEvent() {
    return [
      {
        images: './assets/images/event-1.jpg',
        title: 'News',
        link: '/news',
        description: 'Top 10 khách sạn 5 sao Sapa cho kỳ nghỉ sang trọng, thư giãn',
      },
      {
        images: './assets/images/event-2.jpg',
        title: 'News',
        link: '/news',
        description: 'Nên đi Sapa vào tháng mấy? Gợi ý thời gian lý tưởng để khám Sapa',
      },
      {
        images: './assets/images/event-3.jpg',
        title: 'Những địa điểm nên đến ở SaPa',
        link: '/locations',
        description: 'Quảng trường Sapa – Nơi giao thoa giữa truyền thống và hiện đại',
      },
      {
        images: './assets/images/event-4.jpg',
        title: 'Những địa điểm nên đến ở SaPa',
        link: '/locations',
        description: 'Ăn sáng ở Sapa – 10 Quán ăn sáng không thể bỏ qua tại Sapa',
      },
      {
        images: './assets/images/event-5.jpg',
        title: 'Những địa điểm nên đến ở SaPa',
        link: '/locations',
        description: 'Chụp ảnh Sapa – 12 Điểm check in không thể bỏ qua tại Sapa',
      },
      {
        images: './assets/images/event-6.jpg',
        title: 'News',
        link: '/news',
        description: 'Giá vé cao tốc Hà Nội Lào Cai: Thông tin cập nhật 2023',
      },
    ]
  }

  getFood() {
    return [
      {
        images: './assets/images/food-1.jpg',
        title: 'Fruit&Bread',
        price: '$4.00',
        description: 'Beef, Fruit, Vegetable'
      },
      {
        images: './assets/images/food-2.jpg',
        title: 'Beef&Chess',
        price: '$9.88',
        description: 'Having breakfast by this food is good'
      },
      {
        images: './assets/images/food-3.jpg',
        title: 'Drink',
        price: '$6.5',
        description: 'Full your abs'
      },
      {
        images: './assets/images/food-4.jpg',
        title: 'Paris wasabi',
        price: '$3.6',
        description: 'Very delicious'
      },
      {
        images: './assets/images/food-5.jpg',
        title: 'Chicken',
        price: '$9.5',
        description: 'Fresh in the morning'
      },
      {
        images: './assets/images/food-6.jpg',
        title: 'Rice fried',
        price: '$4.5',
        description: 'Vegetable, rice, chicken'
      },
      {
        images: './assets/images/food-7.jpg',
        title: 'Vegetable',
        price: '$2.8',
        description: 'Vegetable, rice, chicken'
      },
      {
        images: './assets/images/food-8.jpg',
        title: 'Hamburger',
        price: '$5.2',
        description: 'Fresh in the morning'
      },
      {
        images: './assets/images/food-9.jpg',
        title: 'Paris wasabi',
        price: '$3.6',
        description: 'Very delicious'
      },
      {
        images: './assets/images/food-10.jpg',
        title: 'Beef&Drink',
        price: '$6.5',
        description: 'Full your abs'
      },
      {
        images: './assets/images/food-11.jpg',
        title: 'Pizza',
        price: '$4.00',
        description: 'Beef, Fruit, Vegetable'
      },
      {
        images: './assets/images/food-12.jpg',
        title: 'Vegetable',
        price: '$2.8',
        description: 'Vegetable, rice, chicken'
      },
    ]
  }
}
