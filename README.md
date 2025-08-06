# My Next.js SSG App

This is a Next.js application that utilizes Static Site Generation (SSG) for rendering pages. The project is styled using Tailwind CSS for a modern and responsive design.


## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/isanjaymaurya/M-Ganpati-Pandals-Indicator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Building for Production

To build the application for production, run:

```bash
npm run build
```

Then, you can start the production server with:

```bash
npm start
```

## Add or Update Pandals

To add or update any new pandals, please use the following Google Sheet:

[https://docs.google.com/spreadsheets/d/1Z7Dsgv8f0eGSysC6JkOATyBDJODeNd2p8IOiLvPJXlY/edit?usp=sharing](https://docs.google.com/spreadsheets/d/1Z7Dsgv8f0eGSysC6JkOATyBDJODeNd2p8IOiLvPJXlY/edit?usp=sharing)

Please provide your valuable suggestions

## License

This project is licensed under the MIT License.

## Deployment with GitHub Pages

This project can be deployed to GitHub Pages using the `gh-pages` branch. To set up deployment:

1. Install the `gh-pages` package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add the following scripts to your `package.json`:
   ```json
   "scripts": {
     "export": "next build && next export",
     "deploy": "npm run export && gh-pages -d out"
   }
   ```

3. Update your `next.config.js` (if not present, create one) to set the correct `basePath` and `assetPrefix`:
   ```js
   // next.config.js
   module.exports = {
     output: 'export',
     assetPrefix: process.env.NODE_ENV === 'production' ? '/<REPO_NAME>/' : '',
     basePath: process.env.NODE_ENV === 'production' ? '/<REPO_NAME>' : '',
   };
   ```
   Replace `<REPO_NAME>` with your GitHub repository name.

4. Deploy your site:
   ```bash
   npm run deploy
   ```

Your static site will be available at `https://<USERNAME>.github.io/<REPO_NAME>/`.