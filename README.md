# Giphy Pocket

A mobile first react + typescript application to show trending/search Gifs from Giphy API.

## Note

There is a possible bug in Giphy API that would stop the last page in current pagination logic working properly. 

Please see this [issue](https://github.com/nluo/giphy-pocket/issues/4)

## Getting Started

1. **Install dependencies**

```bash
npm i
npm run dev
```

2. **Setup the environment variable:**

Copy the .env.example file and rename it to .env.local:

```bash
cp .env.example .env.local
```

Open the .env.local file and fill in the VITE_GIPHY_API_KEY variable with your Giphy API key. If you don't have the key you could get the key from [Giphy Developer Portal](https://developers.giphy.com/)

3. **Start the development server**

```bash
npm run dev
```
