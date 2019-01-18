module eg {

	/***
	 * ArrayBuffer 二进制数据转换为Base64字符串
	 * 应用如:图片的二进制数据转换为base64字符串显示
	 * 可以解决微信头像跨域 图片合并问题
	 */
	export function transformArrayBufferToBase64(buffer:ArrayBuffer):string{
		var binary = '';
		var bytes = new Uint8Array(buffer);
		for (var len = bytes.byteLength, i = 0; i < len; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return window.btoa(binary);
	}
}