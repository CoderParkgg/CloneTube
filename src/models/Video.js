import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({  //형식만 정해줌
  title: String,  //내용을 넣지 않고 형식만 
  description: String, //이는 {type: String} 과 같다. 그냥 짧게 쓸려고 그런것
  createdAt: {type : Date, require : true},
  hashtags: [{type: String}], //배열인 경우 [], 그 안의 형식을 정할 경우 [{}]
  meta: {  //사용자에게 자동으로 제공하는 것들
      views:Number,
      rating:Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
