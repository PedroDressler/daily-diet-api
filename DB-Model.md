table User {
  id: uuid,
  session_id: string,
  name: string,
  email: string,
  created_at: timestamp,
  updated_at: timestamp
}

table Meals {
  id: uuid,
  user_id: uuid,
  name: string,
  description: string,
  rating: number,
  created_at: timestamp,
  updated_at: timestamp,
  meal_date_time: timestamp,
  id_on_diet: boolean
}