[![Netlify Status](https://api.netlify.com/api/v1/badges/e702f4f8-e1ad-4acf-bcc4-437789b1a2ae/deploy-status)](https://app.netlify.com/sites/inspiring-ramanujan-de5dcc/deploys)

# STONKS!

## What This Is:
This app (named after the [stonks](https://knowyourmeme.com/memes/stonks) meme) was originally designed to be a dashboard for displaying stocks with metrics based on the growth formulas made famous in Benjamin Graham's famous investing tome, "The Intelligent Investor".  The project was a way for me to get familiar/comfortable with React Hooks and is still in a "Proof of Concept" stage.  

## Running The App
This project (while evolving) uses an AWS Lambda as a private backend which is the single point for processing the data used for valuations, as well as the single point of api calls; the reason for this was to reduce a situation where the entire app is littered with calls to different endpoints. Note: *This backend is not yet complete, so api calls will fail (this is currently being worked on; this is also why it points to a localhost api by default).*
