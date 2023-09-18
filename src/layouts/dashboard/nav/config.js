// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: icon('ic_home'),
  },
  {
    title: '프로필 보기',
    path: '/dashboard/profile',
    icon: icon('ic_profile'),
  },
  {
    title: '작품 공고 보기',
    path: '/dashboard/filmo',
    icon: icon('ic_filmo'),
  },
  // {
  //   title: '캘린더로 보기',
  //   path: '/dashboard/calendar',
  //   icon: icon('ic_home'),
  // },
  // {
  //   title: '내 무대인사',
  //   path: '/dashboard/myPage',
  //   icon: icon('ic_home'),
  // },
  // {
  //   title: '배우 프로필',
  //   path: '/dashboard/profile',
  //   icon: icon('ic_profile'),
  // },
  // {
  //   title: '작품 공고',
  //   path: '/dashboard/filmo',
  //   icon: icon('ic_filmo'),
  // },
  // {
  //   title: 'dashboard',
  //   path: '/dashboard/app',
  //   icon: icon('ic_analytics'),
  // },
  // {
  //   title: 'user',
  //   path: '/dashboard/user',
  //   icon: icon('ic_user'),
  // },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
