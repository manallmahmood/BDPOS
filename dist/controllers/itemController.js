var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const itemModel = require("../models/itemModel");
// get items
const getItemController = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const items = yield itemModel.find();
        res.status(200).send(items);
    }
    catch (error) {
        console.log(error);
    }
});
//add items
const addItemController = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const newItem = new itemModel(req.body);
        yield newItem.save();
        res.status(201).send("Item Created Successfully!");
    }
    catch (error) {
        res.status(400).send("error", error);
        console.log(error);
    }
});
//update item
const editItemController = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const { itemId } = req.body;
        console.log(itemId);
        yield itemModel.findOneAndUpdate({ _id: itemId }, req.body, {
            new: true,
        });
        res.status(201).json("item Updated");
    }
    catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});
module.exports = { getItemController, addItemController, editItemController };
