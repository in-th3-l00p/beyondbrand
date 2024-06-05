# BeyondBrand

## General Description
BeyondBrand is an open-source project that provides a platform for brand and customer experience management. It helps companies optimize their brand image by analyzing customer feedback and offering personalized recommendations. Additionally, the platform provides networking functionalities for entrepreneurs.

## Features

- **Generate Names, Descriptions, Color Schemes, and Logos:** Automate the branding process.
- **Business Plan Generation:** Automatically create personalized business plans.
- **Photo Editor:** An editor for Instagram posts.
- **Brand Identity Retention:** Manage and preserve essential brand elements.
- **Networking Forum:** A dedicated forum for entrepreneurs to exchange ideas and collaborate.
- **Blog:** Information and resources about entrepreneurship.

## Tech Stack

The application uses the following technologies:

- **Framework:** [Next.js](https://nextjs.org/) for application development.
- **Design:** [Tailwind CSS](https://tailwindcss.com/) for styling, complemented by libraries like [clsx](https://github.com/lukeed/clsx) and [tailwind-variants](https://tailwindvariants.com/) for cleaner and more understandable code.
- **Database:** [MongoDB](https://www.mongodb.com/), interfaced via the [mongoose](https://mongoosejs.com/) library.
- **Headless CMS:** [Strapi](https://strapi.io/) manages content for landing pages, blog posts, contact forms, and forum content.
- **Artificial Intelligence:** Models provided by [OpenAI](https://openai.com/), accessed via the JavaScript SDK.
- **File Storage:** [Amazon S3](https://aws.amazon.com/s3/), implemented using the [Amazon Web Services SDK](https://aws.amazon.com/sdk-for-javascript/).
- **Integration Testing:** Performed using [Postman](https://www.postman.com/).

## Application Structure

BeyondBrand is a monolithic application primarily using Server Side Rendering (SSR) through Next.js. This ensures fast loading times and good SEO indexing. Components that cannot be implemented via SSR use requests to a REST API, optimized by Next.js caching strategies.

## Photo Editor Implementation

The photo editor, used for social media posts, is implemented using React's functionalities, which are an integral part of Next.js for rendering pages. Global state management is handled through React's Context API.
