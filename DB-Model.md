table User {
  id: uuid,
  name: string,
  meals: Array<Meals>
}

table Meals {
  id: uuid,
  name: string,
  description: string,
  rating: number,
  mealDateTime: string,
  isOnDiet: boolean
}