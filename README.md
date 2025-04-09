## BIRL Tech Test ♻️

### The Task 

This task is designed to test your front-end, back-end, and API integration skills with a real world scenario. 

We'd like you to create a simple Next.js app where the user can enter a product ID to fetch and display product details or an error message if appropriate. You can style the app as you see fit.

Please use the Next.js API to implement the product retrieval functionality. Instead of a database, we have provided static product data in `src/data/products.ts`, along with mock database calls `getProduct` and `getProductsIn`.

Next, the user should be taken to a payment screen where they can enter payment details using Stripe. The payment should place an **extended hold** on the card for the amount of `max_credit` for 10 days. For more details, see the documentation below. We recommend using the `Embedded Form` or `Advanced Integration`.

You shouldn't spend more than 3 hours on this project. We are interested in depth of knowledge and code quality, if you are unable to finish the tasks please write a short note stating where you got up to and how you would have approached the next steps.

During the interview with our technical team, we will spend 5-10 minutes discussing your approach, additional features you might consider adding, and any problems you encountered.

Please avoid using AI code generators to write code, asking questions to help understand the problem is okay though.

### Gotten stuck?

If you get stuck starting the NextJs project locally, run into problems, or have any other questions feel free to reach out to `theo@wearebirl.com`

### Already finished?
Great! Either zip the finished project or push it to a public Git repo and send it over to `theo@wearebirl.com`. If you zip the project please delete the node_modules dir first!

### Starting the project

**This project requires Node version 20**

First, run the development server:

```bash
npm install
# then
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`.

And build the api route for fetching products in `pages/api/products`

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

### NextJS

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

### Stripe Docs 
You will need to register a stripe account or create a project for development purposes. 
Stripe provides testing cards while in dev mode.

- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Payments](https://stripe.com/docs/payments)
- [Stripe Extended Card Holds](https://docs.stripe.com/payments/extended-authorization?platform=web&ui=embedded-form&client=react)

### Notes
To run please add .env.local with the following vales:

```
STRIPE_SECRET_KEY=?
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=?
```

Given more time I would consider the following improvements:

- Host this on a cloud platform to allow effective security mesaures to handle parameters/secrets

- I would also add unit tests & integration testing to ensure code quality and reliability

- Improved loading indicators / Error screens to improver user experience - Add loading to payment screen.

- Accessibility - Adding Aria labela and testing with a screen reader.

- Compatability - Only viewed in browser would like to adjust styling to be mobile compatible.