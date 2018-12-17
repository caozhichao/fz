declare module wx{
    function config (params:any);
    function ready(callback:Function);
    function error(callback:Function);
    function onMenuShareAppMessage(params:any);
    function scanQRCode(params?:any);
    function chooseImage(params?:any);
    function uploadImage(params?:any);
    function getLocation(params?:any);
    function openLocation(params?:any);
    function hideOptionMenu();
    function onMenuShareTimeline(params:any);
    function previewImage(params:any);
    function hideMenuItems(params:any);
    function showMenuItems(params:any);
    function onMenuShareQQ(parsms:any);
    function onMenuShareWeibo(params:any);
    function onMenuShareQZone(parsms:any);
    function getLocalImgData(params:any);
    function addCard(params:any);
    let env:any;
    function getFileSystemManager():any;
    function downloadFile(obj:any);
    function createImage():any;
    function writeFile(obj:any);
}