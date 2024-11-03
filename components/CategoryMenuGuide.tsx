
interface ICategoryMenmuGuideProps{
 category: 
}
const CategoryMenuGuide = () => {
  return (
    <div className="w-full pb-10 sm:pb-0 h-[400px] overflow-y-scroll  [&::-webkit-scrollbar]:hidden">
      <div className="grid grid-cols-1 pb-10 sm:pb-0 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categoryAndMyExercises.map((category) => (
          <FavoriteexerciseCategoryCard
            key={category.id}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryMenuGuide