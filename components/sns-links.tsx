import { FaTwitter, FaGithub } from 'react-icons/fa';
import { SiQiita, SiZenn } from 'react-icons/si';
import { sns } from '@/lib/constants';

const SIZE = 30;

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'twitter':
      return <FaTwitter size={SIZE} />;
    case 'github':
      return <FaGithub size={SIZE} />;
    case 'qiita':
      return <SiQiita size={SIZE} />;
    case 'zenn':
      return <SiZenn size={SIZE} />;
    default:
      return null;
  }
};

export const SnsLinks = () => {
  return (
    <div className="flex gap-4">
      {sns.map((item:any) => (
        <a
            key={item.id}
            href={item.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C9B6E4] hover:text-[#0A1128] transition-all"
        >
          {getIconComponent(item.icon)}
        </a>
      ))}
    </div>
  );
}; 