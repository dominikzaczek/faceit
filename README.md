# Technical Challenge for FaceIT
by: Dominik Zaczek

## Used stack
NextJS 14, Redux, Redux Toolkit, RTK React Query, TailwindCSS, Tailwind Components

I used `npx create-next-app` and based my initial approach on Redux's boilerplate.

## How to run
NextJS 14 requires Node in version at least 18
 1. Run `npm install`
 2. Before running, use `cp .env.local.sample .env.local` to ensure that the posts limit is properly set in environmental variables
 3. To run the project run `npm run dev`
 4. To see the unit tests (and launch jest watcher) run `npm run test`

## About the solution

### Brief introduction
I haven't had a chance to use Redux for many years, especially since introduction of React Hooks (useContext has been sufficient for most of my projects), I needed a few hours to get myself up to speed with the newest Redux implementations.

### Different approaches
I decided to explore different possible approaches with fetching data and rendering the content. My initial approach was to use `createApi` since it supports caching and limiting the amount of requests, which was one of the objectives for this task. It automatically generates React Query hooks which helps providing the best user experience out of the box (handling different query states etc.) At the same time, it has proven to be a little bit challenging when it comes to manipulating the existing cache.

I also provided an alternative solution that uses reducers, so I exported the reducers as well as selectors to provide the data. Using that approach, which is the one I was more familiar with, made manipulating the existing state easier. 

I also wanted to take advantage of SSR and RSCs, so I provided an alternative route for fetching a single post that can be found at `/ssr/[id]` instead of the default `/post/[id]`

### Addressing provided user scenario
1. I provided all of the points from this point
2. I managed to add an additional post to the top of the page (for more details on this - please read below) and I didn't have enough time to make the app highlight the newest post
3. The selected post is displayed on a separated page
4. I took advantage of the NextJS's Link feature that remembers the last scrolled position by default (more on that - please read below)

## Additional considerations
The solution has many possible improvements. I wanted to cap my time spent on the challenge because I would like to show my real skills and accept if they aren't sufficient for the role. But here are my considerations:

### Adding a post in real time
In my solution, it is done on the client side by hooks. In real-life, production-ready application I would use either webhooks or GraphQL subscriptions. 

### Scrolling to the last read position
As I took advantage of the NextJS's Link feature, it works out of the box - you navigate back in your browser and it sets you at the same position as when you left. If it required a little bit more thorough solution, I would the post's id to the global state when user clicks it for more details. 

## Conclusion
Thank you for giving me a chance to prove my skills. 

