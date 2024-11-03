// src/components/ExerciseCategoryCard.tsx

interface ExerciseCategoryCardProps {
  title: string;
}

const FavoriteexerciseCategoryCard: React.FC<ExerciseCategoryCardProps> = ({
  title,
}) => {
  return (
    <div
      className="bg-gray-800 rounded-lg shadow-lg p-6 text-center 
    transition-transform transform hover:scale-105 hover:bg-accent  cursor-pointer"
    >
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
  );
};

export default FavoriteexerciseCategoryCard;
