// ============================================================
// 여행 데이터 파일 - 여기만 수정하면 화면이 자동으로 바뀝니다.
// ============================================================

const SITE = {
  name: "한 규동",
  heroTitle: "가볼 곳과 일정을 한곳에서",
  heroText: "미리 정리해 둔 여행지와 일정을 휴대폰으로 바로 확인하세요.",
  fallbackImage: "images/placeholder.svg" // 이미지가 없거나 깨질 때 대신 보여줄 이미지
};

// 메인 페이지에 표시되는 전체 일정 (destination에 여행지 id를 쓰면 링크가 걸립니다)
const SCHEDULE = [
  { date: "1일차", title: "나리타 공항 도착, ", destination: "jeju" },
  { date: "2일차", title: "한라산 둘레길과 동쪽 일출", destination: "jeju" },
  { date: "3일차", title: "부산 이동, 해변 열차 탑승", destination: "busan" }
];

// 여행지 목록: 항목을 복사해서 추가하면 카드와 상세 페이지가 자동 생성됩니다.
// id는 주소(detail.html?id=...)에 쓰이므로 영문 소문자와 숫자만 사용하세요.
const DESTINATIONS = [
  {
    id: "jeju",
    name: "제주",
    region: "제주특별자치도",
    summary: "바다와 오름, 숲길을 하루에 만나는 섬.",
    image: "images/jeju.svg",
    featured: true, // true면 메인 페이지 '주요 여행지'에 표시
    description:
      "제주는 서쪽 해안도로와 동쪽 오름, 한라산 둘레길까지 코스가 다양합니다. 렌터카로 이동하면 하루에 여러 곳을 둘러볼 수 있습니다.",
    places: [
      { name: "협재 해수욕장", info: "얕고 맑은 바다. 일몰 시간에 맞춰 방문", time: "오후 4시 ~ 6시" },
      { name: "새별오름", info: "왕복 약 1시간, 정상에서 서쪽 바다 조망", time: "오전 10시 ~ 11시" },
      { name: "성산일출봉", info: "일출 명소. 입장 마감 시간 확인 필요", time: "오전 6시" }
    ]
  },
  {
    id: "busan",
    name: "부산",
    region: "부산광역시",
    summary: "해변 열차와 시장 골목이 있는 항구 도시.",
    image: "images/busan.svg",
    featured: true,
    description:
      "부산은 해운대에서 송정까지 이어지는 해안 구간과 자갈치시장, 감천문화마을을 하루 코스로 묶기 좋습니다.",
    places: [
      { name: "해변열차 청사포 구간", info: "바다 옆 철길을 달리는 관광 열차", time: "오전 11시" },
      { name: "자갈치시장", info: "회와 해산물 식당이 모인 시장", time: "점심" }
    ]
  },
  {
    id: "gangneung",
    name: "강릉",
    region: "강원특별자치도",
    summary: "커피 거리와 동해 바다를 함께 즐기는 곳.",
    image: "images/gangneung.svg",
    featured: false,
    description: "강릉은 안목해변 카페 거리와 경포호 산책길이 가까워 당일치기나 1박 여행에 알맞습니다.",
    places: [] // 세부 장소가 없으면 안내 문구가 표시됩니다.
  }
];
