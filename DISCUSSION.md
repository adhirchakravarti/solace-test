# Discussion

## Improving performance on the frontend

### Notes

The original code was only relying on client-side requests for the advocate list. A quick to improve performance was to make use of react server components (comes with next) to fetch the advocate list and have it ready for the client side components as soon as they mount to the DOM (at least on the initial render).

Since there was a search input to filter the advocate list, I think it was important to append the search query to the URL as a search parameters. This way, if the app is reloaded, the server component can use the search params in the URL to filter the advocate list at the SQL query level. 


## Improving performance on the backend

### Notes

I realized that to improve performance on the backend, we need to filter at the query level. This proved a little bit tricky due to my inexperience with drizzle-orm. Eventually I arrived at the solution that is satisfactory considering the time-constraints. If I had more time, I would improve it such that even the phone numbers are searchable; currently that doesn't work. 

Some of my naive attempts are filtering at the SQL query  level before settling on the current approach:

```
const data = await db
    .select()
    .from(advocates)
    .where(
      ilike(advocates.firstName, `%${searchQuery}%`)
        .or(ilike(advocates.lastName, `%${searchQuery}%`))
        .or(ilike(advocates.city, `%${searchQuery}%`))
        .or(ilike(advocates.degree, `%${searchQuery}%`))
        .or(ilike(advocates.specialties, `%${searchQuery}%`))
        .or(ilike(advocates.yearsOfExperience, `%${searchQuery}%`))
    );
```
```
  const data = await db.query.advocates.findMany({
    where: or(
      ilike(advocates.firstName, `%${searchQuery}%`),
      ilike(advocates.lastName, `%${searchQuery}%`),
      ilike(advocates.city, `%${searchQuery}%`),
      ilike(advocates.degree, `%${searchQuery}%`),
      ilike(advocates.specialties, `%${searchQuery}%`),
      ilike(advocates.yearsOfExperience, `%${searchQuery}%`),
      ilike(advocates.phoneNumber, `%${searchQuery}%`)
    ),
  });
```
### Issues

Also had trouble generating indexes in order to do full-text search:

The drizzle-orm documentation mentioned a different format (currently used) but that resulted in a TypeScript error. I tried to solve the TS error and was able to by using the below format. However, this did not generate the indexes. when running `npx drizzle-kit generate` or `npx drizzle-kit push`. So, based on a linked issue on the drizzle repository, I reverted to the format in the documentation and sure enough, the indexes were generated. I disabled the TS error with a note.

```
  (table) => ({
     indexes: [
       index("search_index").using(
         "gin",
          sql`(
             setweight(to_tsvector('english', ${table.firstName}), 'A') ||
             setweight(to_tsvector('english', ${table.lastName}), 'A') ||
             setweight(to_tsvector('english', ${table.city}), 'B') ||
             setweight(to_tsvector('english', ${table.degree}), 'B') ||
             setweight(to_tsvector('english', ${table.specialties}), 'C') ||
             setweight(to_tsvector('english', ${table.yearsOfExperience}), 'D') ||
             setweight(to_tsvector('english', ${table.phoneNumber}), 'D')
         )`
       ),
     ],
  })
```
