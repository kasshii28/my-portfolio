import { FaTwitter, FaGithub } from 'react-icons/fa'
import { SiZenn, SiQiita } from 'react-icons/si'

export const navItems = [
  { title: 'Home', url: '#hero' },
  { title: 'About', url: '#about' },
  { title: 'Skills', url: '#skills' },
  { title: 'Projects', url: '#projects' },
  { title: 'Blogs', url: '#blog' },
  { title: 'Contact', url: '#contact' },
];

export const aboutText = {
  title: 'About Me',
  content: `
  私は日本の大学でコンピュータサイエンスを学んでいる学生です。
日々、部活動の仲間と一緒に活動したり、アプリ開発プロジェクトに取り組んだりしながら過ごしています。
中でも特に力を入れているのがフロントエンド開発です。人と人とをつなぐインターフェースを作ることが大好きです。
最近ではバックエンドにも興味が広がり、フルスタックエンジニアを目指して学びを深めています。
一歩ずつ、エンジニアとして成長し続ける毎日です。`
  };

export const skills = [
  { id: 1, name: 'React', level: 60, group: 'frontend' },
  { id: 2, name: 'Next.js', level: 35, group: 'frontend' },
  { id: 3, name: 'TypeScript', level: 70, group: 'languages' },
  { id: 4, name: 'Tailwind CSS', level: 60, group: 'styling' },
  { id: 5, name: 'JavaScript', level: 80, group: 'languages' },
  { id: 6, name: 'Python', level: 75, group: 'languages' },
  { id: 7, name: 'UI/UX Design', level: 40, group: 'design' },
  { id: 8, name: 'Docker', level: 40, group: 'tools' },
  { id: 9, name: 'Go lang', level: 30, group: 'languages' },
];

export const projects = [
  {
    id: 1,
    title: 'さよならは夕闇の中で',
    description: 'Unityの2Dゲームです。サークルで作成しました',
    technologies: ['Unity', 'C#'],
    imageUrl: '/game.jpg',
  },
  {
    id: 2,
    title: '勉強会',
    description: '大学内で開催した勉強会です',
    technologies: ['C', 'Python', 'Js'],
    imageUrl: '/C.jpg',
  },
  {
    id: 3,
    title: 'Qiita,Zennの記事をDiscordで通知するbot',
    description: 'Qiita, Zennのそれぞれでその日の人気記事Top3(いいね数基準)を通知するBotです',
    technologies: ['GAS', 'Discord WebHook'],
    imageUrl: '/discord.png',
  },
  {
    id: 4,
    title: '大学の教室予約アプリ',
    description: '大学内の空き教室をサークルなどの団体が自由に予約できるアプリです。',
    technologies: ['Python', 'Flask', 'SQlite', 'JS', 'OAuth2'],
    imageUrl: '/yoyaku.png',
  },
  // {
  //   id: 5,
  //   title: 'サークル用会計アプリ',
  //   description: 'サークル内で使用するための会計アプリです。サークルメンバーが現在までの収支などを確認したり、会計の管理ができます。',
  //   technologies: ['React', 'TanstackRouter', 'Python', 'Flask', 'PostgresSQL'],
  //   imageUrl: '/portfolio.png',
  // }
];

export const sns = [
  {
    id: 1,
    name: 'X',
    icon: 'twitter',
    url: 'https://x.com/kasshii',
  },
  {
    id: 2,
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/kasshii28',
  },
  {
    id: 3,
    name: 'Qiita',
    icon: 'qiita',
    url: 'https://qiita.com/kasshii28',
  },
  {
    id: 4,
    name: 'Zenn',
    icon: 'zenn',
    url: 'https://zenn.dev/kasshii18',
  },
]