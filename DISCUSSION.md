# Discussion

## Performance improvements

### Improving performance on the frontend

#### Notes

The original code was only relying on client-side requests for the advocate list. A quick way to improve performance was to make use of react server components (comes with next) to fetch the advocate list and have it ready for the client side components as soon as they mount to the DOM (at least on the initial render).

Since there was a search input to filter the advocate list, I think it was important (for UX) to append the search query to the URL as a search parameters. This way, if the app is reloaded, the server component can use the search params in the URL to filter the advocate list at the SQL query level. 

In order to prevent a flood of successive API requests to `/api/advocates` when the user enters input into the search filter, it was essential to use some kind of a debounce mechanism to make the API request when there is a pause in the input. 


### Improving performance on the backend

#### Notes

I realized that to improve performance on the backend, we needed to filter at the query level. This proved a little bit tricky due to my inexperience with drizzle-orm. Eventually I arrived at the solution that is satisfactory considering the time-constraints. If I had more time, I would improve it such that even partial words are searchable; currently that doesn't work. 

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
#### Issues

1. I had trouble generating indexes in order to do full-text search:

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
2. I ran into a strange error after the below commit (which adds HeroUI) when running the application in development mode. The error was:
`Internal error: Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined`

commit: https://github.com/adhirchakravarti/solace-test/commit/41daafcaa5eecfd9539e254e11df98ea6777d88a

I spent a lot of time to track a mistake in my code, but couldn't find it. Eventually, I reverted to the commit before this and updated the project dependencies (and dev-dependencies) before adding HeroUI which resolved the issue.

PR for documentation: https://github.com/adhirchakravarti/solace-test/pull/4



## Styling decisions

Since the starting project came with Tailwindcss (and it's certainly growing in popularity), I stayed with it and searched for a tailwind friendly UI component library that looks good out of the box. I settled for HeroUI which seemed easy to work with and had components with that looked modern and sleek.

I'm used to viewing a lot of web-sites that have switchable light / dark themes, so I think that was an important and easy to implement feature when using the right tools. I used Next-themes to easily set-up a basic light / dark theme.

## Further improvements with time

To improve this project further, I would do the following:

1. Improve the filtering at the SQL level so that even partial words can be matched. 
2. Add pagination on both the backend and the frontend to fetch a subset of rows.
3. Add a docker or docker compose configuration to deploy and run the app.
4. Add a github workflow to run some checks before PRs are merged (linting, typechecking, tests, build, etc)
5. Add e2e / integration tests that test all the functionality.
6. Redo the ESlint configuration with stricter rules and auto-formatting functionality such as sorting imports in a certain order for readability and adding an empty line between related blocks of logic.

