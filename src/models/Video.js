import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({  //형식만 정해줌
  title: {type : String, require : true, minLength : 1, maxLength : 80},
  description: {type : String, }, 
  createdAt: {type : Date, require : true, default : Date.now}, //default값을 넣어줄 수 있다. 이런 경우 이후 이 모델을 불러 값에 맞게 넣어주지 않을 경우 알아서 기본 값이 들어간다. 
  hashtags: [{type: String}],                                   //참고로 함수에 ()를 붙이지 않은 이유는 여기서 실행시키고 싶지 않기 떄문. 함수명 = 코드.
  meta: {  //사용자에게 자동으로 제공하는 것들
      views:{type : Number, default : 0, require : true},
      rating:{type : Number, default : 0, require : true},
  },
});

/*  
//middleware 사용해서 저장하는 것을 나까아 채서 데이터 수정하기.
videoSchema.pre("save", async function () { 
  this.hashtags = this.hashtags[0].split(",").map(word => word.startsWith("#") ? word : `#{word}`);
});
*/

/*
//함수 사용하기
export const formatHashtags = (hashtags) => {
  hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
}
*/

//정적 메소드 사용하기
videoSchema.static("formatHashtags", function(hashtags){
  return hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`));
})


const Video = mongoose.model("Video", videoSchema);
export default Video;
