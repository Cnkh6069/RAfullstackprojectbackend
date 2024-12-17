# RAfullstack project

Backend

- Using MongoDB and Express
- To deploy this project on your own terminal, you would need your own mongoDB database and save the link in the created .env file as DB_URI.
  **Requirements**

1. Backend app should be able to perform Create, Read, Update and Delete requests to the DB via ThunderClient.
2. Collections should have at least 3 attributes
3. At least one Collection should have relationship to another Collection
4. Have a Expense collection with the CRUD functions tied to Budget and category
5. Category collection to store all the areas where expenses are to be tracked
6. Budget to store amount saved for each budget, and tied to the same category, to tie to expenses for amount used.
7. CRUD for Income collection, not directly linked to Expense, Budget collection. Can be tied to categories, since Income can linek to Categories.

Front End

- Uses React
