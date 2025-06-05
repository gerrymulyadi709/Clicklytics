# Clicklytics

Clicklytics is a simple web application built on the Internet Computer (ICP) ecosystem, designed to track and display user button click statistics in real-time. It features a Motoko backend running as an ICP canister and a React frontend that offers a natural, user-friendly interface.

---

### Setup & Run Locally

1. Clone the repository:

 ```
git clone https://github.com/yourusername/clicklytics.git
cd clicklytics
```

2. Install frontend dependencies and start the React app:
```
npm install
```

3. Start the local IC & Deploy the backend canister:
```
dfx start --background
dfx deploy
```
