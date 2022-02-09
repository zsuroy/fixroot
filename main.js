/**
 * Android fixroot
 * @author Suroy
 * @date 2022.2.8
 * @lastedit 2022.2.8
 * @url https://suroy.cn
 * @other
 * shell: am start -p org.autojs.autojs # 启动autojs(root)
 * 
 */

 "auto";  // 自动打开无障碍服务

 const WIDTH = Math.min(device.width, device.height);
 const HEIGHT = Math.max(device.width, device.height);
 const DEBUG_SUROY = false; // 开发调试模式
 
 // config
 const OPTS = {
     "CLICK_METHOD": 0, // 点击方式
     "TIME_HOUR": 3, // 定时
     "TIME_MIN": 25,
     "PHONE": device.model,
     "IMEI": device.getIMEI(),
     "BAT": device.getBattery(),
     "APP": "com.qihoo.permmgr",
     "ACTIVITY": "com.qihoo.root.ui.AppListFragmentNew"
 }
 
 if(!OPTS["CLICK_METHOD"])
 {
     // redefine to adapt to the android 5.0 with root
     this.click = function (x, y) {
         return (shell("input tap " + x + " " + y, true).code === 0);
     };
 }
 
 
 setup(OPTS); // start
 // exit();
 
 
 /**
  * setup
  * @param {*} opt 
  */
 function setup(opt)
 {
     device.wakeUp();
     toast('Hello, This is Suroy!');
     console.log(device.model, device.getBattery()+"%");
     console.info(opt);
     if(Root())
     {
        console.info("Root:", Root());
        unlock();
        debug(opt["APP"], opt["ACTIVITY"]);
     }


     console.info("over...");
     var remTimes = 0;
     threads.start(function(){
         // new thread
         setInterval(function(){
             // console.log("Heart Detect");
             var myDate = new Date();
             if(myDate.getHours() == opt["TIME_HOUR"] && myDate.getMinutes() == opt["TIME_MIN"]){
                console.info("Ping: ok");
             }
             // heart
            //  ping(opt["IMEI"], opt["PHONE"], opt["BAT"]);
             // remote
             if(remTimes++ > 5)
             {
                //  remote(opt["IMEI"], opt["PHONE"]);
                 remTimes = 0;
             }
         }, 250);
     });
 
 }
 
 function debug(pkg, act)
 {
    console.warn('run');
    // try {
    //     app.startActivity({
    //     packageName: pkg,
    //     className: act,
    //     root: true
    //     });
    // } catch (error) {
        
    // }
    app.launch(pkg);
    sleep(500);
    clickMapTxt("ROOT管理", 0);
    var txt = "拒绝";
    // click(txt);
    textContains(txt).findOne().click();
    console.log(777);
    // findByText(txt);
    // click(973, 1140);
    // c_y = text(txt).findOne().bounds().centerY();
    // c_y = text(txt).findOne().centerY();
    // console.info("SPosition:", c_x, c_y);
    // sleep(500);
    // sleep(500);
    console.log(666);  
 }


/**
*
* Click the position of text
* @author Suroy
* @param {txt} string 欲点击文本
* @param {types} 点击功能类型
* 
*/
function clickMapTxt(txt, types)
{   
    if(types == 0)
    { // normal x-y axis | Android 7.0+ 无障碍 | Android 5.0+ Root

        c_x = text(txt).findOne().bounds().centerX();
        c_y = text(txt).findOne().bounds().centerY();
        console.info("Position:", c_x, c_y);
        sleep(500);
        click(c_x, c_y);
        // Tap(c_x, c_y);
        sleep(500);
    }
    else if(types == 1)
    { // 无障碍点击 | Android 5.0+ Noroot | T: HTC One E8 Android6.0 Noroot
        var clickRes = text(txt).findOne().parent().click(); // 由父节点查询控件进行点击 | longClick
        console.info("Position:", clickRes);
        sleep(500);
    }
    return 1;
}

 function unlock()
 {
    //  swipe(546,1611,1005,1631,1);
     Swipe(546,1611,1005,1631,500); // root
     console.info("Unlock");
 }

function Root(){
    return files.exists("/system/bin/su");
}