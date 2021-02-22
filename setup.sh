#!/bin/sh
echo "INSTALL DEPENDENCIES"
npm install
echo "RUN BUILD"
npm run build-ts
echo "RUN DB MIGRATIONS"
npm run migrate
echo "SEED DATA"
npm run seed:all
echo "SETUP COMPLETED"
