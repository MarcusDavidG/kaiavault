# TODO - Project Restructuring

- [x] Create "contracts" folder at root and move Solidity contracts and abi folder there
- [x] Create "frontend" folder at root and move frontend code (app, components, hooks, lib) there
- [x] Update tsconfig.json to map "@" to "./frontend/*"
- [x] Update import paths in frontend code to reflect new folder structure
  - [x] Update imports from "@/abi" to relative imports from "../contracts/abi" in lib/contracts.ts and other files
- [ ] Verify and update any other import paths affected by the move
- [ ] Test the project build and run to ensure everything works after restructuring
