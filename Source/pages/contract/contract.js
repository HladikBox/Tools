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
  }
  onMyShow() {
    var that = this;
  }
  downloadtemplate(e) {
    var uploadpath = this.Base.getMyData().uploadpath;
    var res = this.Base.getMyData().res;
    var doc = uploadpath + "resource/" + res.contracttemplate;
    this.Base.download(doc, () => {}, true);
  }

  upload() {
    wx.chooseMessageFile({
      count: 1,
      type: "file",
      extension: ["doc", 'docx'],
      success: (res) => {
        console.log("res", res);
        var filepath = res.tempFiles[0].path;
        this.Base.uploadFile("test", filepath, (filename) => {
          console.log("filename",filename);
          // var toolsapi = new ToolsApi();
          // toolsapi.getparameter({
          //   filename
          // }, (res) => {
            
          // });
          wx.navigateTo({
            url: '/pages/contractload/contractload?filename='+filename,
          })
        });
      }
    })
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.downloadtemplate = content.downloadtemplate;
body.upload = content.upload;
Page(body)