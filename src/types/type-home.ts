interface BadgeCardProps {
    title: string;
    description: string;
    index: number;
    className: string;
}

type cardServiceProps = {
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
};