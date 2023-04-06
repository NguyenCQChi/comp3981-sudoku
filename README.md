## Installing packages
```bash
npm install
# or 
yarn
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Link to our wireframe
https://www.figma.com/file/peBNEb8n93HMscChbn1Lh0/COMP3981?t=UqB0sI8qSghcsJAe-1

## To see our brute_force and csp algorithm files, they are under folder: pages/api

## Limitations
Had some issues in CSP where the board would be complete, but it continues to backtrack and does not stop.
To fix this, we added an extra check to see if the board is complete in lines 83-85 of csp.ts. 
This alleviated the return issues but did not fully remove them, certain boards will still have false returns.

Javascript front end was too heavy for the browser, so we moved it to the backend with NodeJS.

Data structure used for Brute Force: 2D array stack
