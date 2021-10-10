import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({  //형식만 정해줌
  title: {type : String, required : true, minLength : 1, maxLength : 80},
  fileUrl : {type : String, required: true},
  description: {type : String, }, 
  createdAt: {type : Date, require : true, default : Date.now}, //default값을 넣어줄 수 있다. 이런 경우 이후 이 모델을 불러 값에 맞게 넣어주지 않을 경우 알아서 기본 값이 들어간다. 
  hashtags: [{type: String}],                                   //참고로 함수에 ()를 붙이지 않은 이유는 여기서 실행시키고 싶지 않기 떄문. 함수명 = 코드.
  meta: {  //사용자에게 자동으로 제공하는 것들
      views:{type : Number, default : 0, require : true},
      rating:{type : Number, default : 0, require : true},
  },
  owner : {type : mongoose.Schema.Types.ObjectId, required: true, ref:"User"} //objectId를 타입으로 하는 또 하나의 프로퍼티를 만들어주었다. objectid를 type으로 지정하려면 이처럼 mongoose.Schema.types.ObjectId 로 작성해야 한다. 
  //ref는 objectId를 가져올 모델. objectid는 데이터베이스에 값을 저장하였을 때 하나의 객체마다 id를 무작위로 부여하였었는데 그 id가 objectid이다. 
});

videoSchema.static("formatHashtags", function(hashtags){
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})


const Video = mongoose.model("Video", videoSchema);
export default Video;
