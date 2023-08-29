import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const FILMO_TITLES = [
  '괴물',
  '철인왕후',
  '사랑의 불시착',
  '해운대',
  '카지노',
  'DP',
  '이번 생은 처음이라',
  '시크릿가든',
  '쩐의전쟁',
  '해를품은달',
  '육룡이 나르샤',
  '킹더랜드',
];

const FILMO_TYPES = [
  'MOVIE',
  'DRAMA',
  'DRAMA',
  'MOVIE',
  'DRAMA',
  'DRAMA',
  'DRAMA',
  'DRAMA',
  'DRAMA',
  'DRAMA',
  'DRAMA',
  'DRAMA',
];

const POST_TITLES = [
  '주연 아빠역 구인',
  '주연 철종역 구인',
  '조연 김정현역 구인',
  '주연 설경구역 구인',
  '주연 최민식역 구인',
  '주연 정해인역 구인',
  '주연 안보현역 구인',
  '주연 현빈역 구인',
  '주연 박신양역 구인',
  '주연 김수현역 구인',
  '주연 유아인역 구인',
  '주연 윤아역 구인',
];

const posts = [...Array(23)].map((_, index) => ({
  id: faker.datatype.uuid(),
  cover: `/assets/images/covers/filmo_${index + 1}.jpg`,
  filmoTitle: FILMO_TITLES[index + 1],
  title: POST_TITLES[index + 1],
  filmoType: FILMO_TYPES[index + 1],
  createdAt: faker.date.past(),
  view: faker.datatype.number(),
  comment: faker.datatype.number(),
  share: faker.datatype.number(),
  favorite: faker.datatype.number(),
  author: {
    name: faker.name.fullName(),
    avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  },
}));

export default posts;
