# Readme

I implemented the solution using typeorm as orm for postgres db and typescript with tests written in jest.

## Setup

1. please add file called .env for database url example below.
1. run `npm i` to install dependencies
1. in order to run the migrations `npm run typeorm migration:run -- -d ./src/database/main.ts`
1. in order to run the seed `npx ts-node src/database/seed.ts` 
1. i added seeds files but couldn't manage continue, i would do a script to run all the seeds using the native postgres library with transactions.
1. to run tests run `npm test`
1. to run in dev mode `npm run dev` this will run the server in a dev mode which will compile and restart the server each time a ts file change.
1. for production we need first to compile the ts files to js files in dist folder using `npm run build` then we run the server normally using `npm start`

## .env file example

``` text
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=myappdb
```

## Note on entity and models

i created 2 separate files for each table

1. entity is the typeorm entity that typeorm will use.
1. model is the file that should be used in the routes including helper function to execute different queries on the entity file.

I like to separate both to have better clarity however, here i think both can be combined for simplicity.

## Note on POI pagination

unfortunately couldn't manage to get it done however the why to do it is by using order, skip and take ex.
`POI.find({
   order: {
      ["id"]: "ASC",
    },
    skip,
    take: limit
})`
where for ex. a page is 10 POIs and skip is the page number or the batch and we should always have the list sorted so for ex. if we have a list of 100 POIs and we want to paginate with page size 10 then we would have 10 pages each containing 10 POIs sorted by id and to implement this in a route we only need to send from the frontend the skip (page number) we could also send the order and the take (limit) however they must have a defaultValues and incase we use different values those values have to be sent **every time** we query a different page, to ensure consistency

## Note on opening hours implementations

in order to build a scheme to fit all the 3 cases without redundant columns i purposed the following column scheme it would be 1-n relation with the POI table
where the poi table will include.
 isClosedOnHoliday: boolean;
while a table called openingHours with the following scheme
 startDay:number # of the start of day of the week -starting 0 means sunday- of this rule
 endDay:number # of the end of day of the week  of this rule
 openTime: string the opening hour of the rule
 closeTime: string  closing hour of the rule

 ex. rules data

 1. case one Open Monday to Friday from 8 AM to 8 PM, Saturdays from 8AM to 6 PM, closed on Sundays and public holidays.
  (startDay, EndDay, openingTime, closeTime) values (1, 5, "8:00", "20:00")
  (startDay, EndDay, openingTime, closeTime) values (6, 6, "8:00", "18:00")
  and isClosedOnHoliday = true on POI table

 1. case Open daily, including public holidays.
  (startDay, EndDay, openingTime, closeTime) values (0, 6, "0:00", "24:00")
  and isClosedOnHoliday = false on POI table

 1. case three Open Monday to Thursday 6 AM to 8PM, Fridays from 6AM to 4 PM, closed on Saturdays, Sundays and public holidays.
  (startDay, EndDay, openingTime, closeTime) values (1, 4, "6:00", "20:00")
  (startDay, EndDay, openingTime, closeTime) values (5, 5, "6:00", "16:00")
  and isClosedOnHoliday = true on POI table.

 while no rule for a day means closed.

 how to query? so in case we need to check for specific day WED

 `const result = await openingHours.find({
  where: [
    {
      startDay: MoreThanOrEqual(3),
    },
    {
      EndDay: LessThanOrEqual(3),
    },
  ],
})`

## Note on tests

 unfortunately didn't manage to create extra tests but managed to create a test for creating and delete a POI and get all POIs. i would have implemented not just unit tests but also integration for all routes making sure everyting run correctly.

## Note on Routes

  all routes start with param validations to make sure the frontend sends the right params then a try catch block to check errors and send standard responses.

## Note on currencies

 for simplicity i chose to add 2 columns for usd and eur as base currencies. in case we need to use different currency we can use the current conversion rate from the base currency to the currency need to be shown.
