import {Schema} from "mongoose";

const ImageSchema = new Schema({
    title:{type:String, required:true}
});
export default ImageSchema;