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

  getLocation() {
    return [
      {
        title: 'Top 10 khách sạn 5 sao Sapa cho kỳ nghỉ sang trọng, thư giãn',
        description: 'Sapa là một trong những điểm đến du lịch nổi tiếng của Việt Nam, thu hút hàng triệu du khách trong và ngoài nước mỗi năm. Sapa không chỉ có...',
        image: './assets/images/location-1.jpg',
      },
      {
        title: 'Nên đi Sapa vào tháng mấy? Gợi ý thời gian lý tưởng để khám Sapa',
        description: 'Sapa là một trong những điểm đến du lịch hấp dẫn nhất ở miền Bắc Việt Nam, với khí hậu mát mẻ quanh năm, cảnh quan thiên nhiên tuyệt đẹp,...',
        image: './assets/images/location-2.jpg',
      },
      {
        title: 'Quảng trường Sapa – Nơi giao thoa giữa truyền thống và hiện đại',
        description: 'Sapa là một trong những địa điểm du lịch nổi tiếng của Việt Nam, thu hút hàng triệu lượt khách trong và ngoài nước mỗi năm. Nếu bạn đã có...',
        image: './assets/images/location-3.jpg',
      },
      {
        title: 'Ăn sáng ở Sapa – 10 Quán ăn sáng không thể bỏ qua tại Sapa',
        description: 'Sapa là một trong những điểm đến du lịch hấp dẫn nhất của Việt Nam, với khung cảnh thiên nhiên tuyệt đẹp, nền văn hóa đa dạng và nhiều trải...',
        image: './assets/images/location-4.jpg',
      },
      {
        title: 'Chụp ảnh Sapa – 12 Điểm check in không thể bỏ qua tại Sapa',
        description: 'Sapa là một điểm đến lý tưởng cho những ai yêu thích chụp ảnh và khám phá thiên nhiên. Sapa có nhiều địa điểm chụp ảnh đẹp và đa dạng,...',
        image: './assets/images/location-5.jpg',
      },
      {
        title: 'Giá vé cao tốc Hà Nội Lào Cai: Thông tin cập nhật 2024',
        description: 'Bạn đang có kế hoạch đi du lịch Lào Cai, Sa Pa hay các tỉnh phía Bắc? Bạn muốn biết giá vé cao tốc Hà Nội Lào Cai để lên...',
        image: './assets/images/location-6.jpg',
      },
      {
        title: 'Nghỉ lễ 2 9 nên đi đâu chơi? Gợi ý 10 địa điểm du lịch hấp dẫn tại Việt Nam',
        description: 'Nghỉ lễ 2/9 là dịp lý tưởng để bạn và gia đình, bạn bè thư giãn, khám phá những vùng đất mới mẻ và tận hưởng những trải nghiệm thú...',
        image: './assets/images/location-7.jpg',
      },
      {
        title: 'Thung lũng hoa hồng Sapa – Điểm đến mơ mộng cho du khách',
        description: 'Sapa là một trong những điểm đến hấp dẫn nhất của du lịch Việt Nam, với khí hậu mát mẻ quanh năm, cảnh sắc thiên nhiên tuyệt đẹp và nền...',
        image: './assets/images/location-8.jpg',
      },
      {
        title: 'Săn mây Sapa – Trải nghiệm du lịch độc đáo và ấn tượng',
        description: 'Sapa là một trong những điểm đến hấp dẫn nhất của du khách trong và ngoài nước khi muốn tìm kiếm một nơi nghỉ dưỡng thư giãn, khám phá vẻ...',
        image: './assets/images/location-9.jpg',
      },
      {
        title: 'Bến xe Sapa – Điểm trung chuyển cho du khách đến với Lào Cai',
        description: 'Bến xe Sapa là một trong những điểm nối quan trọng cho du khách khi muốn đến với Lào Cai, một tỉnh nằm ở phía Tây Bắc Việt Nam, nổi...',
        image: './assets/images/location-10.jpg',
      },
    ]
  }

  hotLocation() {
    return [
      {
        title: 'Top 10 khách sạn 5 sao Sapa cho kỳ nghỉ sang trọng, thư giãn',
        description: 'Sapa là một trong những điểm đến du lịch nổi tiếng của Việt Nam, thu hút hàng triệu du khách trong và ngoài nước mỗi năm. Sapa không chỉ có...',
        image: './assets/images/location-1.jpg',
      },
      {
        title: 'Nên đi Sapa vào tháng mấy? Gợi ý thời gian lý tưởng để khám Sapa',
        description: 'Sapa là một trong những điểm đến du lịch hấp dẫn nhất ở miền Bắc Việt Nam, với khí hậu mát mẻ quanh năm, cảnh quan thiên nhiên tuyệt đẹp,...',
        image: './assets/images/location-2.jpg',
      },
      {
        title: 'Quảng trường Sapa – Nơi giao thoa giữa truyền thống và hiện đại',
        description: 'Sapa là một trong những địa điểm du lịch nổi tiếng của Việt Nam, thu hút hàng triệu lượt khách trong và ngoài nước mỗi năm. Nếu bạn đã có...',
        image: './assets/images/location-3.jpg',
      },
      {
        title: 'Ăn sáng ở Sapa – 10 Quán ăn sáng không thể bỏ qua tại Sapa',
        description: 'Sapa là một trong những điểm đến du lịch hấp dẫn nhất của Việt Nam, với khung cảnh thiên nhiên tuyệt đẹp, nền văn hóa đa dạng và nhiều trải...',
        image: './assets/images/location-4.jpg',
      },
      {
        title: 'Chụp ảnh Sapa – 12 Điểm check in không thể bỏ qua tại Sapa',
        description: 'Sapa là một điểm đến lý tưởng cho những ai yêu thích chụp ảnh và khám phá thiên nhiên. Sapa có nhiều địa điểm chụp ảnh đẹp và đa dạng,...',
        image: './assets/images/location-5.jpg',
      },
      {
        title: 'Review nhà hàng Ô Quý Hồ: Tâm điểm của ẩm thực đặc sản Sapa',
        description: 'Bạn đang tìm kiếm địa chỉ ăn ngon khi đến Sapa? Vậy thì yên tâm, nơi đây không thiếu những nhà hàng, quán ăn đặc sắc, thể hiện được hương...',
        image: './assets/images/location-11.jpg',
      },
      {
        title: '“Vượt biên” tại Hà Khẩu Lào Cai để khám phá nước bạn có gì?',
        description: 'Du lịch Hà Khẩu, “vượt biên” sang nước bạn khám phá có dễ dàng không? Sau khi đặt chân đến Hà Khẩu Lào Cai chúng ta sẽ ăn gì, chơi...',
        image: './assets/images/location-12.jpg',
      },
      {
        title: 'Thác tình yêu Sapa: Vẻ đẹp kỳ vĩ, nguyên sơ của Tây Bắc',
        description: 'Sapa với thiên nhiên hùng vĩ, thơ mộng, do đó có rất nhiều điểm du lịch đặc trưng như các cung đèo, rừng xanh và cả các thác nước.',
        image: './assets/images/location-13.jpg',
      },
    ]
  }
}
