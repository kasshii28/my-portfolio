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
  I’m a university student in Japan, studying computer science.
  I spend my days working with friends on club activities and collaborating on app development projects.
  I’m especially passionate about frontend development—I love creating interfaces that connect people.
  Recently, I’ve also started exploring backend development, expanding my interest toward full-stack engineering.
  Step by step, I continue learning and growing on my journey as an engineer.`
  };

export const skills = [
  { id: 1, name: 'React', level: 60, description: 'Building interactive UIs with modern React patterns and hooks', group: 'frontend' },
  { id: 2, name: 'Next.js', level: 35, description: 'Creating performant, SEO-friendly applications with server-side rendering', group: 'frontend' },
  { id: 3, name: 'TypeScript', level: 65, description: 'Writing type-safe code for more reliable applications', group: 'languages' },
  { id: 4, name: 'Tailwind CSS', level: 60, description: 'Crafting beautiful, responsive designs with utility-first CSS', group: 'styling' },
  { id: 5, name: 'JavaScript', level: 80, description: 'Developing dynamic web experiences with modern JavaScript', group: 'languages' },
  { id: 6, name: 'Python', level: 75, description: 'Building backend services and APIs with JavaScript', group: 'backend' },
  { id: 7, name: 'UI/UX Design', level: 40, description: 'Creating intuitive, accessible, and beautiful user experiences', group: 'design' },
  { id: 8, name: 'CSS/SCSS', level: 90, description: 'Styling web applications with modern CSS techniques', group: 'styling' },
  { id: 9, name: 'GraphQL', level: 70, description: 'Working with efficient data queries and mutations', group: 'backend' },
  { id: 10, name: 'Animation', level: 85, description: 'Bringing interfaces to life with thoughtful motion design', group: 'design' },
];

export const projects = [
  {
    id: 1,
    title: 'Nebula',
    subtitle: 'A Journey Through Space',
    description: 'An interactive web experience that takes users on a journey through our solar system, with beautiful animations and educational content.',
    technologies: ['React', 'Three.js', 'GSAP', 'CSS'],
    imageUrl: 'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 2,
    title: 'Dreamscape',
    subtitle: 'Digital Art Gallery',
    description: 'A virtual gallery showcasing digital artwork with a dreamy aesthetic, featuring works from artists around the world.',
    technologies: ['Next.js', 'Framer Motion', 'Supabase', 'Tailwind CSS'],
    imageUrl: 'https://images.pexels.com/photos/3679524/pexels-photo-3679524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 3,
    title: 'Whisper',
    subtitle: 'Mindfulness Application',
    description: 'A mobile-first web application designed to help users practice mindfulness and meditation with calming visuals and sounds.',
    technologies: ['React Native', 'Expo', 'Firebase', 'Styled Components'],
    imageUrl: 'https://images.pexels.com/photos/1834407/pexels-photo-1834407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
  {
    id: 4,
    title: 'Lullaby',
    subtitle: 'Music Streaming Platform',
    description: 'A specialized music streaming service focused on ambient and calming music for focus, sleep, and relaxation.',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Web Audio API'],
    imageUrl: 'https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    link: '#',
  },
];