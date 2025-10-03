import { DyslexiaModule } from '../enum';

export interface LearningPlan {
  title: string;
  description: string;
  weeks: WeekPlan[];
}

export interface WeekPlan {
  week: number;
  title: string;
  goals: string[];
  activities: Activity[];
  tips: string[];
}

export interface Activity {
  name: string;
  duration: string;
  description: string;
  materials?: string[];
}

export interface TreatmentCenter {
  name: string;
  address: string;
  phone: string;
  region: 'north' | 'central' | 'south';
  specialties: string[];
  website?: string;
}

// Lộ trình học 4 tuần dựa theo module yếu
export const LEARNING_PLANS: Record<DyslexiaModule, LearningPlan> = {
  [DyslexiaModule.PHONOLOGICAL_AWARENESS]: {
    title: "Lộ trình cải thiện Nhận thức âm vị",
    description: "Chương trình 4 tuần tập trung vào việc phát triển khả năng nhận biết và phân biệt âm thanh trong ngôn ngữ.",
    weeks: [
      {
        week: 1,
        title: "Nhận biết âm thanh cơ bản",
        goals: [
          "Phân biệt âm thanh giống và khác nhau",
          "Nhận biết âm đầu của từ",
          "Tập trung chú ý nghe"
        ],
        activities: [
          {
            name: "Trò chơi âm thanh",
            duration: "15 phút/ngày",
            description: "Chơi các trò chơi nhận biết âm thanh từ môi trường xung quanh",
            materials: ["Đồ chơi phát âm", "Nhạc cụ đơn giản"]
          },
          {
            name: "Luyện nghe phân biệt",
            duration: "10 phút/ngày", 
            description: "Nghe và phân biệt các cặp âm thanh tương tự",
            materials: ["File âm thanh", "Tai nghe"]
          }
        ],
        tips: [
          "Tạo môi trường yên tĩnh khi luyện tập",
          "Khen ngợi mọi nỗ lực của trẻ",
          "Thực hiện đều đặn mỗi ngày"
        ]
      },
      {
        week: 2,
        title: "Phân tích âm tiết",
        goals: [
          "Đếm số âm tiết trong từ",
          "Tách từ thành các âm tiết",
          "Ghép âm tiết thành từ"
        ],
        activities: [
          {
            name: "Đập tay theo âm tiết",
            duration: "10 phút/ngày",
            description: "Đập tay theo từng âm tiết khi nói từ",
            materials: ["Danh sách từ vựng"]
          },
          {
            name: "Trò chơi ghép âm tiết",
            duration: "15 phút/ngày",
            description: "Ghép các âm tiết để tạo thành từ có nghĩa",
            materials: ["Thẻ âm tiết", "Bảng từ vựng"]
          }
        ],
        tips: [
          "Bắt đầu với từ ngắn, đơn giản",
          "Sử dụng các từ quen thuộc với trẻ",
          "Kết hợp với nhịp điệu, bài hát"
        ]
      },
      {
        week: 3,
        title: "Nhận biết âm đầu, âm cuối",
        goals: [
          "Xác định âm đầu của từ",
          "Xác định âm cuối của từ",
          "Tìm từ có cùng âm đầu/cuối"
        ],
        activities: [
          {
            name: "Trò chơi âm đầu",
            duration: "15 phút/ngày",
            description: "Tìm các từ có cùng âm đầu",
            materials: ["Hình ảnh", "Thẻ từ vựng"]
          },
          {
            name: "Câu đố vần điệu",
            duration: "10 phút/ngày",
            description: "Tìm từ押韻 (có cùng âm cuối)",
            materials: ["Thơ đơn giản", "Bài hát"]
          }
        ],
        tips: [
          "Sử dụng hình ảnh trực quan",
          "Tạo thành trò chơi vui nhộn",
          "Lặp lại nhiều lần để ghi nhớ"
        ]
      },
      {
        week: 4,
        title: "Tổng hợp và nâng cao",
        goals: [
          "Kết hợp các kỹ năng đã học",
          "Phân tích âm thanh phức tạp hơn",
          "Tự tin trong nhận biết âm vị"
        ],
        activities: [
          {
            name: "Trò chơi tổng hợp",
            duration: "20 phút/ngày",
            description: "Kết hợp nhiều kỹ năng âm vị trong một trò chơi",
            materials: ["Bộ thẻ học tập", "Bàn chơi"]
          },
          {
            name: "Đánh giá tiến bộ",
            duration: "15 phút/tuần",
            description: "Kiểm tra khả năng cải thiện của trẻ",
            materials: ["Bài test đơn giản"]
          }
        ],
        tips: [
          "Ghi nhận những tiến bộ của trẻ",
          "Tiếp tục luyện tập những kỹ năng còn yếu",
          "Chuẩn bị chuyển sang kỹ năng khác"
        ]
      }
    ]
  },

  [DyslexiaModule.DECODING]: {
    title: "Lộ trình cải thiện Nhận diện chữ & giải mã",
    description: "Chương trình 4 tuần phát triển khả năng nhận biết chữ cái và giải mã từ ngữ.",
    weeks: [
      {
        week: 1,
        title: "Nhận biết chữ cái cơ bản",
        goals: [
          "Nhận biết các chữ cái đơn lẻ",
          "Phân biệt chữ hoa và chữ thường",
          "Liên kết chữ cái với âm thanh"
        ],
        activities: [
          {
            name: "Thẻ chữ cái",
            duration: "15 phút/ngày",
            description: "Luyện nhận biết chữ cái qua thẻ học",
            materials: ["Bộ thẻ chữ cái", "Gương"]
          },
          {
            name: "Viết chữ cái",
            duration: "10 phút/ngày",
            description: "Luyện viết chữ cái trong không khí và trên giấy",
            materials: ["Giấy", "Bút chì", "Tập tô"]
          }
        ],
        tips: [
          "Học từng chữ cái một cách chậm rãi",
          "Kết hợp nhiều giác quan (nhìn, nghe, chạm)",
          "Sử dụng các bài hát về chữ cái"
        ]
      },
      {
        week: 2,
        title: "Kết hợp chữ cái thành từ",
        goals: [
          "Ghép chữ cái thành từ đơn giản",
          "Đọc từ ngắn (2-3 chữ cái)",
          "Hiểu ý nghĩa từ vừa đọc"
        ],
        activities: [
          {
            name: "Ghép chữ thành từ",
            duration: "15 phút/ngày",
            description: "Sử dụng thẻ chữ cái để ghép thành từ",
            materials: ["Thẻ chữ cái", "Danh sách từ đơn giản"]
          },
          {
            name: "Đọc từ có hình ảnh",
            duration: "10 phút/ngày",
            description: "Đọc từ đi kèm với hình ảnh minh họa",
            materials: ["Sách tranh", "Thẻ từ vựng có hình"]
          }
        ],
        tips: [
          "Bắt đầu với từ quen thuộc",
          "Sử dụng hình ảnh hỗ trợ",
          "Kiên nhẫn và khuyến khích"
        ]
      },
      {
        week: 3,
        title: "Đọc câu đơn giản",
        goals: [
          "Đọc câu ngắn (3-5 từ)",
          "Hiểu nghĩa câu vừa đọc",
          "Tăng tốc độ đọc"
        ],
        activities: [
          {
            name: "Đọc câu có hình ảnh",
            duration: "15 phút/ngày",
            description: "Đọc câu đơn giản có hình ảnh minh họa",
            materials: ["Sách đọc đầu tiên", "Hình ảnh"]
          },
          {
            name: "Trò chơi đọc",
            duration: "10 phút/ngày",
            description: "Các trò chơi đọc hiểu đơn giản",
            materials: ["Thẻ câu", "Đồ chơi"]
          }
        ],
        tips: [
          "Đọc chậm và rõ ràng",
          "Giải thích nghĩa khi cần",
          "Tạo không khí vui vẻ khi đọc"
        ]
      },
      {
        week: 4,
        title: "Lưu loát và tự tin",
        goals: [
          "Đọc lưu loát hơn",
          "Tự tin khi đọc",
          "Hiểu và nhớ nội dung đã đọc"
        ],
        activities: [
          {
            name: "Đọc to",
            duration: "15 phút/ngày",
            description: "Đọc to các đoạn văn ngắn",
            materials: ["Sách truyện ngắn", "Thơ đơn giản"]
          },
          {
            name: "Kể lại nội dung",
            duration: "10 phút/ngày",
            description: "Kể lại những gì vừa đọc",
            materials: ["Sách", "Giấy ghi chú"]
          }
        ],
        tips: [
          "Khen ngợi mọi tiến bộ",
          "Không vội vàng sửa lỗi",
          "Tạo thói quen đọc hàng ngày"
        ]
      }
    ]
  },

  [DyslexiaModule.UNDERSTANDING_FLUENCY]: {
    title: "Lộ trình cải thiện Tốc độ hiểu",
    description: "Chương trình 4 tuần phát triển khả năng hiểu nhanh và chính xác nội dung đọc.",
    weeks: [
      {
        week: 1,
        title: "Hiểu từ vựng cơ bản",
        goals: [
          "Hiểu nghĩa từ vựng thường dùng",
          "Liên kết từ với hình ảnh",
          "Ghi nhớ từ vựng mới"
        ],
        activities: [
          {
            name: "Thẻ từ vựng hình ảnh",
            duration: "15 phút/ngày",
            description: "Học từ vựng qua hình ảnh trực quan",
            materials: ["Thẻ từ vựng có hình", "Album ảnh"]
          },
          {
            name: "Trò chơi nối từ",
            duration: "10 phút/ngày",
            description: "Nối từ với hình ảnh tương ứng",
            materials: ["Thẻ từ", "Thẻ hình", "Bảng chơi"]
          }
        ],
        tips: [
          "Sử dụng từ vựng quen thuộc trước",
          "Tạo câu chuyện với từ mới",
          "Lặp lại từ vựng thường xuyên"
        ]
      },
      {
        week: 2,
        title: "Hiểu câu và đoạn ngắn",
        goals: [
          "Hiểu ý nghĩa câu hoàn chỉnh",
          "Nắm bắt thông tin chính",
          "Trả lời câu hỏi đơn giản"
        ],
        activities: [
          {
            name: "Đọc và trả lời",
            duration: "15 phút/ngày",
            description: "Đọc đoạn ngắn và trả lời câu hỏi",
            materials: ["Sách đọc hiểu", "Danh sách câu hỏi"]
          },
          {
            name: "Kể lại bằng hình ảnh",
            duration: "10 phút/ngày",
            description: "Sử dụng hình ảnh để kể lại nội dung",
            materials: ["Hình ảnh tuần tự", "Câu chuyện đơn giản"]
          }
        ],
        tips: [
          "Đặt câu hỏi trong khi đọc",
          "Sử dụng ngôn ngữ cơ thể",
          "Khuyến khích trẻ đặt câu hỏi"
        ]
      },
      {
        week: 3,
        title: "Tăng tốc độ hiểu",
        goals: [
          "Đọc và hiểu nhanh hơn",
          "Nắm bắt ý chính ngay lập tức",
          "Xử lý nhiều thông tin cùng lúc"
        ],
        activities: [
          {
            name: "Đọc có thời gian",
            duration: "15 phút/ngày",
            description: "Luyện đọc hiểu trong thời gian giới hạn",
            materials: ["Đồng hồ bấm giờ", "Bài đọc ngắn"]
          },
          {
            name: "Trò chơi tìm thông tin",
            duration: "10 phút/ngày",
            description: "Tìm thông tin cụ thể trong đoạn văn",
            materials: ["Báo trẻ em", "Danh sách thông tin cần tìm"]
          }
        ],
        tips: [
          "Không quá căng thẳng về thời gian",
          "Tập trung vào hiểu chứ không phải tốc độ",
          "Nghỉ ngơi khi cần thiết"
        ]
      },
      {
        week: 4,
        title: "Hiểu sâu và linh hoạt",
        goals: [
          "Hiểu ý nghĩa sâu xa",
          "Kết nối thông tin mới với kiến thức cũ",
          "Tự tin trong việc hiểu nội dung"
        ],
        activities: [
          {
            name: "Thảo luận nội dung",
            duration: "15 phút/ngày",
            description: "Thảo luận về nội dung đã đọc",
            materials: ["Sách truyện", "Câu hỏi mở"]
          },
          {
            name: "Viết tóm tắt",
            duration: "10 phút/ngày",
            description: "Viết tóm tắt ngắn về nội dung đọc",
            materials: ["Giấy", "Bút", "Bài đọc"]
          }
        ],
        tips: [
          "Khuyến khích trẻ chia sẻ ý kiến",
          "Tôn trọng quan điểm của trẻ",
          "Tạo môi trường học tập tích cực"
        ]
      }
    ]
  },

  [DyslexiaModule.SPELLING_WRITING]: {
    title: "Lộ trình cải thiện Chính tả & viết",
    description: "Chương trình 4 tuần phát triển kỹ năng viết chữ và chính tả chính xác.",
    weeks: [
      {
        week: 1,
        title: "Viết chữ cái cơ bản",
        goals: [
          "Viết chính xác các chữ cái",
          "Kiểm soát bút chì tốt",
          "Viết theo đúng hướng"
        ],
        activities: [
          {
            name: "Tập viết chữ cái",
            duration: "15 phút/ngày",
            description: "Luyện viết từng chữ cái trong tập tô",
            materials: ["Tập tô chữ cái", "Bút chì to", "Gôm"]
          },
          {
            name: "Viết trên cát/muối",
            duration: "10 phút/ngày",
            description: "Viết chữ cái trên bề mặt cát hoặc muối",
            materials: ["Khay cát", "Muối màu"]
          }
        ],
        tips: [
          "Cầm bút đúng tư thế",
          "Viết chậm và chính xác",
          "Sử dụng giấy có dòng kẻ to"
        ]
      },
      {
        week: 2,
        title: "Viết từ đơn giản",
        goals: [
          "Viết từ 2-3 chữ cái",
          "Đánh vần chính xác",
          "Nhớ cách viết từ quen thuộc"
        ],
        activities: [
          {
            name: "Chép từ mẫu",
            duration: "15 phút/ngày",
            description: "Chép lại từ mẫu có sẵn",
            materials: ["Sách viết mẫu", "Bút chì", "Giấy tập viết"]
          },
          {
            name: "Đánh vần và viết",
            duration: "10 phút/ngày",
            description: "Nghe từ, đánh vần rồi viết ra",
            materials: ["Danh sách từ vựng", "Giấy trống"]
          }
        ],
        tips: [
          "Bắt đầu với từ ngắn",
          "Đánh vần to từng chữ cái",
          "Kiểm tra lại sau khi viết"
        ]
      },
      {
        week: 3,
        title: "Viết câu ngắn",
        goals: [
          "Viết câu có 3-5 từ",
          "Sử dụng dấu câu cơ bản",
          "Viết có ý nghĩa"
        ],
        activities: [
          {
            name: "Viết câu theo mẫu",
            duration: "15 phút/ngày",
            description: "Viết câu theo các mẫu câu có sẵn",
            materials: ["Mẫu câu", "Từ vựng thay thế"]
          },
          {
            name: "Miêu tả hình ảnh",
            duration: "10 phút/ngày",
            description: "Viết câu miêu tả hình ảnh",
            materials: ["Hình ảnh đơn giản", "Giấy viết"]
          }
        ],
        tips: [
          "Viết câu đơn giản trước",
          "Sử dụng từ vựng quen thuộc",
          "Đọc lại câu vừa viết"
        ]
      },
      {
        week: 4,
        title: "Viết lưu loát và sáng tạo",
        goals: [
          "Viết tự nhiên hơn",
          "Tự tạo ra câu mới",
          "Thể hiện ý tưởng qua viết"
        ],
        activities: [
          {
            name: "Viết nhật ký",
            duration: "15 phút/ngày",
            description: "Viết vài câu về hoạt động trong ngày",
            materials: ["Sổ nhật ký", "Bút màu"]
          },
          {
            name: "Sáng tác câu chuyện",
            duration: "10 phút/ngày",
            description: "Tạo ra câu chuyện ngắn",
            materials: ["Giấy", "Bút", "Hình ảnh gợi ý"]
          }
        ],
        tips: [
          "Khuyến khích sự sáng tạo",
          "Không quá chú trọng lỗi chính tả",
          "Khen ngợi ý tưởng hay"
        ]
      }
    ]
  },

  [DyslexiaModule.LANGUAGE_COMPREHENSION]: {
    title: "Lộ trình cải thiện Hiểu và nhận dạng ngôn ngữ",
    description: "Chương trình 4 tuần phát triển khả năng hiểu và sử dụng ngôn ngữ hiệu quả.",
    weeks: [
      {
        week: 1,
        title: "Hiểu ngôn ngữ cơ bản",
        goals: [
          "Hiểu ý nghĩa từ trong ngữ cảnh",
          "Nhận biết các loại từ",
          "Hiểu câu lệnh đơn giản"
        ],
        activities: [
          {
            name: "Trò chơi theo lệnh",
            duration: "15 phút/ngày",
            description: "Thực hiện các hành động theo lệnh bằng lời",
            materials: ["Danh sách lệnh", "Đồ chơi"]
          },
          {
            name: "Phân loại từ vựng",
            duration: "10 phút/ngày",
            description: "Phân loại từ theo nhóm (động vật, đồ vật, màu sắc...)",
            materials: ["Thẻ từ vựng", "Hộp phân loại"]
          }
        ],
        tips: [
          "Sử dụng ngôn ngữ cơ thể hỗ trợ",
          "Lặp lại hướng dẫn khi cần",
          "Tạo môi trường tương tác tích cực"
        ]
      },
      {
        week: 2,
        title: "Hiểu quan hệ ngôn ngữ",
        goals: [
          "Hiểu mối quan hệ giữa các từ",
          "Nhận biết từ trái nghĩa, đồng nghĩa",
          "Hiểu câu hỏi và trả lời phù hợp"
        ],
        activities: [
          {
            name: "Trò chơi từ trái nghĩa",
            duration: "15 phút/ngày",
            description: "Tìm từ trái nghĩa cho từ cho sẵn",
            materials: ["Thẻ từ", "Bảng chơi"]
          },
          {
            name: "Hỏi đáp",
            duration: "10 phút/ngày",
            description: "Luyện tập hỏi và trả lời câu hỏi",
            materials: ["Danh sách câu hỏi", "Hình ảnh"]
          }
        ],
        tips: [
          "Giải thích mối liên hệ giữa các từ",
          "Sử dụng ví dụ cụ thể",
          "Khuyến khích trẻ đặt câu hỏi"
        ]
      },
      {
        week: 3,
        title: "Sử dụng ngôn ngữ linh hoạt",
        goals: [
          "Diễn đạt ý tưởng rõ ràng",
          "Sử dụng ngôn ngữ trong nhiều tình huống",
          "Hiểu ngôn ngữ không chính thức"
        ],
        activities: [
          {
            name: "Kể chuyện",
            duration: "15 phút/ngày",
            description: "Kể lại chuyện đã nghe hoặc tự sáng tác",
            materials: ["Sách truyện", "Hình ảnh tuần tự"]
          },
          {
            name: "Đóng vai",
            duration: "10 phút/ngày",
            description: "Đóng vai trong các tình huống khác nhau",
            materials: ["Kịch bản đơn giản", "Đạo cụ"]
          }
        ],
        tips: [
          "Tạo cơ hội thực hành đa dạng",
          "Không sửa lỗi quá nhiều khi trẻ đang nói",
          "Khuyến khích sự tự tin"
        ]
      },
      {
        week: 4,
        title: "Thành thạo ngôn ngữ",
        goals: [
          "Sử dụng ngôn ngữ một cách tự nhiên",
          "Hiểu ý nghĩa ẩn trong lời nói",
          "Giao tiếp hiệu quả với người khác"
        ],
        activities: [
          {
            name: "Thảo luận chủ đề",
            duration: "15 phút/ngày",
            description: "Thảo luận về các chủ đề trẻ quan tâm",
            materials: ["Danh sách chủ đề", "Hình ảnh gợi ý"]
          },
          {
            name: "Trình bày ngắn",
            duration: "10 phút/ngày",
            description: "Trình bày về một chủ đề yêu thích",
            materials: ["Giấy ghi chú", "Đồ dùng hỗ trợ"]
          }
        ],
        tips: [
          "Lắng nghe và phản hồi tích cực",
          "Khuyến khích sự sáng tạo trong ngôn ngữ",
          "Ghi nhận tiến bộ và động viên"
        ]
      }
    ]
  }
};

// Thông tin các cơ sở điều trị dyslexia uy tín
export const TREATMENT_CENTERS: TreatmentCenter[] = [
  // Miền Bắc
  {
    name: "Bệnh viện Nhi Trung ương",
    address: "18/879 La Thành, Đống Đa, Hà Nội",
    phone: "(024) 3747 0531",
    region: "north",
    specialties: ["Tâm lý trẻ em", "Rối loạn học tập", "Can thiệp sớm"],
    website: "https://nhi.org.vn"
  },
  {
    name: "Bệnh viện Đại học Y Hà Nội",
    address: "1 Tôn Thất Tùng, Đống Đa, Hà Nội",
    phone: "(024) 3825 2141",
    region: "north",
    specialties: ["Tâm thần kinh", "Rối loạn ngôn ngữ", "Dyslexia"],
    website: "https://hmu.edu.vn"
  },
  {
    name: "Trung tâm Tâm lý Can thiệp sớm Hà Nội",
    address: "P301 tòa nhà Golden Palace, Mễ Trì, Nam Từ Liêm, Hà Nội",
    phone: "(024) 3576 2345",
    region: "north",
    specialties: ["Can thiệp sớm", "Trị liệu ngôn ngữ", "Dyslexia trẻ em"],
    website: "https://canthiepsomhanoi.com"
  },
  {
    name: "Viện Sức khỏe Tâm thần - Bệnh viện Bạch Mai",
    address: "78 Giải Phóng, Đống Đa, Hà Nội",
    phone: "(024) 3869 3731",
    region: "north",
    specialties: ["Tâm lý học đường", "Rối loạn học tập", "Đánh giá năng lực"],
    website: "https://bachmai.gov.vn"
  },
  {
    name: "Trung tâm Y tế Quận Hai Bà Trưng",
    address: "42 Lê Đại Hành, Hai Bà Trưng, Hà Nội",
    phone: "(024) 3943 5678",
    region: "north",
    specialties: ["Sức khỏe trẻ em", "Tư vấn phát triển", "Sàng lọc rối loạn học tập"]
  },

  // Miền Trung
  {
    name: "Bệnh viện Nhi Trung ương Huế",
    address: "6 Nguyễn Sinh Cung, TP. Huế",
    phone: "(0234) 3826 881",
    region: "central",
    specialties: ["Tâm lý trẻ em", "Can thiệp sớm", "Rối loạn phát triển"],
    website: "https://bvnhue.org.vn"
  },
  {
    name: "Bệnh viện Đà Nẵng",
    address: "124 Nguyễn Công Trứ, Hải Châu, Đà Nẵng",
    phone: "(0236) 3821 192",
    region: "central",
    specialties: ["Thần kinh trẻ em", "Tâm lý học đường", "Dyslexia"],
    website: "https://bvdanang.vn"
  },
  {
    name: "Trung tâm Can thiệp sớm Đà Nẵng",
    address: "K123/24 Cách Mạng Tháng 8, Hải Châu, Đà Nẵng",
    phone: "(0236) 3654 321",
    region: "central",
    specialties: ["Trị liệu ngôn ngữ", "Can thiệp hành vi", "Dyslexia"],
    website: "https://canthiepsom-dn.gov.vn"
  },
  {
    name: "Bệnh viện Phụ sản Nhi Nghệ An",
    address: "86 Đinh Công Tráng, TP. Vinh, Nghệ An",
    phone: "(0238) 3844 555",
    region: "central",
    specialties: ["Phát triển trẻ em", "Rối loạn học tập", "Tư vấn gia đình"]
  },
  {
    name: "Trung tâm Phục hồi chức năng Quảng Nam",
    address: "01 Phan Bội Châu, Hội An, Quảng Nam",
    phone: "(0235) 3927 888",
    region: "central",
    specialties: ["Phục hồi ngôn ngữ", "Kỹ năng học tập", "Dyslexia"]
  },

  // Miền Nam
  {
    name: "Bệnh viện Nhi đồng 1 TP.HCM",
    address: "341 Sư Vạn Hạnh, Quận 10, TP.HCM",
    phone: "(028) 3865 4270",
    region: "south",
    specialties: ["Tâm lý trẻ em", "Rối loạn học tập", "Can thiệp sớm"],
    website: "https://nhi1.org.vn"
  },
  {
    name: "Bệnh viện Nhi đồng 2 TP.HCM",
    address: "14 Lý Tự Trọng, Quận 1, TP.HCM",
    phone: "(028) 3829 8424",
    region: "south",
    specialties: ["Thần kinh trẻ em", "Phát triển ngôn ngữ", "Dyslexia"],
    website: "https://bvnhi2.org.vn"
  },
  {
    name: "Bệnh viện Đại học Y Dược TP.HCM",
    address: "215 Hồng Bàng, Quận 5, TP.HCM",
    phone: "(028) 3855 4269",
    region: "south",
    specialties: ["Tâm thần kinh", "Rối loạn ngôn ngữ", "Đánh giá tâm lý"],
    website: "https://umc.edu.vn"
  },
  {
    name: "Trung tâm Can thiệp sớm TP.HCM",
    address: "371 Nguyễn Kiệm, Phú Nhuận, TP.HCM", 
    phone: "(028) 3841 1234",
    region: "south",
    specialties: ["Can thiệp sớm", "Trị liệu ngôn ngữ", "Kỹ năng học tập"],
    website: "https://canthiepsom.hcm.gov.vn"
  },
  {
    name: "Bệnh viện Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, Quận 5, TP.HCM",
    phone: "(028) 3855 4137",
    region: "south",
    specialties: ["Tâm thần", "Tâm lý trẻ em", "Rối loạn phát triển"],
    website: "https://choray.vn"
  },
  {
    name: "Bệnh viện Nhi Đồng Cần Thơ",
    address: "3/2 street, Xuân Khánh, Ninh Kiều, Cần Thơ",
    phone: "(0292) 3830 109",
    region: "south",
    specialties: ["Phát triển trẻ em", "Sức khỏe tâm thần", "Can thiệp giáo dục"],
    website: "https://bvnhidongtv.gov.vn"
  }
];
