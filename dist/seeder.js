var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDb = require("./config/config");
const itemModel = require("./models/itemModel");
const items = require("./utils/data");
require("colors");
//config
dotenv.config();
connectDb();
//function seeder
const importData = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield itemModel.deleteMany();
        const itemsData = yield itemModel.insertMany(items);
        console.log("All Items Added".bgGreen);
        process.exit();
    }
    catch (error) {
        console.log(`${error}`.bgRed.inverse);
        process.exit(1);
    }
});
importData();
