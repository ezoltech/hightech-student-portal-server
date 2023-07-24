# hightech-student-portal-server
a simple API backend for Hightech students club

# setting up project
first clone the repository using HTTPS or SSH(below)
```bash
git clone https://github.com/ezoltech/hightech-student-portal-server.git
```
```bash
git clone git@github.com:ezoltech/hightech-student-portal-server.git
```
then install all the required dependencies in npm or yarn (below)
```bash
npm install
```
```bash
yarn install
```
then to run in dev mode
```bash
npm run dev
```
```
yarn dev
```

# setting up db
first push schema to database using
```bash
npm run prisma db push
```
```bash
yarn prisma db push
```
then generate client
```bash
npm run prisma generate
```
```bash
yarn prisma generate
```
# if setup correctly, you should see this when going to /api-docs
![Alt text](image.png)