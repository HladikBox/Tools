// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  ToolsApi
} from '../../apis/tools.api';

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
    var filename = options.filename;
    var toolsapi = new ToolsApi();
    toolsapi.getparameter({
      filename
    }, (res) => {
      console.log(res);
      this.Base.setMyData({fields:res.return});
    });
  }
  onMyShow() {
    var that = this;
  }
  confirm(e){
    console.log(e.detail.value);
    var toolsapi = new ToolsApi();
    toolsapi.replacecontract({
      filename:this.Base.options.filename,
      fields:JSON.stringify(e.detail.value),
    }, (res) => {
      console.log(res);
      if(res.code==0){
        var url = "https://cmsdev.app-link.org/users/alucard263096/tools/logs/" +res.return;
        
        this.Base.download(url, () => { }, true);
      }else{
        wx.showToast({
          title: '上传失败',
        })
      }
    });
  }
  
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad; 
body.onMyShow = content.onMyShow;
body.confirm = content.confirm;
Page(body)