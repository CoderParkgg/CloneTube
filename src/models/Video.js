import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({  //형식만 정해줌
  title: String,  //내용을 넣지 않고 형식만 
  description: String, //이는 {type: String} 과 같다. 그냥 짧게 쓸려고 그런것
  createdAt: Date,
  hashtags: [{type: String}], //배열인 경우 [], 그 안의 형식을 정할 경우 [{}]
  meta: {
      views:Number,
      rating:Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
