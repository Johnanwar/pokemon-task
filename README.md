/ihorizon-task
  ├── /src
  │   ├── /features           # Feature-based folder structure
  │   │   ├── /pokemon        # Pokemon feature
  │   │   │   ├── /components # Pokemon UI components (pokemon-card, pokemon-list)
  │   │   │   ├── /screens    # Pokemon pages (list & details)
  │   ├── /services           # API calls (Redux Toolkit Query)
  │   │   ├── query.ts        # Pokemon API service
  │   │   ├── type.ts        # Interfaces
  │   ├── /store             # Redux store configuration
  │   ├── App.tsx            # Main application file
  │   ├── main.tsx           # React entry point
  │   ├── index.css          # Tailwind styles
  │
  ├── /public                # Static assets
  ├── /spec                  # Test files (Jest & Vitest)
  ├── jest.unit.json         # Jest configuration
  ├── jest.setup.js          # Jest setup file
  ├── tsconfig.json          # TypeScript config
  ├── vite.config.ts         # Vite configuration
  ├── package.json           # Dependencies & scripts
  ├── README.md              # Project documentation


* Note 
I wrote the test cases in a right way but unfortunately i have issue in test:coverage command but you can try npm run test command