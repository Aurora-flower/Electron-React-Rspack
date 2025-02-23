# WebRTC

## 引言

    WebRTC（Web实时通信）是 HTML5 提供的一套实时通信 API，它允许浏览器之间直接进行音视频通信和数据共享，无需通过服务器中转。

---

### 音视频通信

使用 WebRTC API 进行基本音视频通信的步骤：

1. 获取用户媒体设备访问权限：

   使用`getUserMedia()`方法请求用户授权访问其摄像头和麦克风，获取媒体流对象。

   ```javascript
   navigator.mediaDevices
     .getUserMedia({ video: true, audio: true })
     .then(function (stream) {
       // 获取到媒体流，可以进行后续操作
     })
     .catch(function (error) {
       // 用户拒绝访问或其他错误处理
     });
   ```

2. 创建本地音视频轨道：

   从媒体流中获取音频和视频轨道，并将它们添加到一个`RTCPeerConnection`对象中。

   ```javascript
   const localStream = new MediaStream();
   stream.getTracks().forEach(function (track) {
     localStream.addTrack(track);
   });
   ```

3. 创建本地`RTCPeerConnection`对象：

   使用`RTCPeerConnection`构造函数创建本地连接对象，并设置需要的配置。

   ```javascript
   const configuration = {
     iceServers: [{ urls: 'stun:stun.example.org' }]
   };
   const localPeerConnection = new RTCPeerConnection(
     configuration
   );
   ```

4. 添加本地媒体轨道到本地连接对象：
   将本地音视频轨道添加到本地`RTCPeerConnection`对象中。

   ```javascript
   localStream.getTracks().forEach(function (track) {
     localPeerConnection.addTrack(track, localStream);
   });
   ```

5. 创建远程`RTCPeerConnection`对象：

   创建用于接收远程音视频流的远程`RTCPeerConnection`对象。

   ```javascript
   const remotePeerConnection = new RTCPeerConnection(
     configuration
   );
   ```

6. 添加远程媒体轨道到远程连接对象：

   通过添加远程ICE候选项和信令交换，将远程音视频轨道添加到远程`RTCPeerConnection`对象中。

   ```javascript
   function handleIceCandidate(event) {
     if (event.candidate) {
       remotePeerConnection.addIceCandidate(event.candidate);
     }
   }

   // 远程ICE候选项通过信令交换获取后添加
   remotePeerConnection.onicecandidate = handleIceCandidate;
   ```

7. 创建数据通道（可选）：

   如果还需要通过数据通道进行数据传输，可以创建一个`RTCDataChannel`实例，并设置相应的事件处理程序。

   ```javascript
   const dataChannel =
     localPeerConnection.createDataChannel('dataChannel');
   dataChannel.onmessage = function (event) {
     // 处理接收到的数据
   };
   ```

8. 建立连接：

   在本地和远程`RTCPeerConnection`对象之间建立音视频通信的连接，通过信令服务器交换Session Description Protocol（SDP）描述信息。

   ```javascript
   async function startCall() {
     const offer = await localPeerConnection.createOffer();
     await localPeerConnection.setLocalDescription(offer);

     // 通过信令服务器交换offer SDP

     // 远程接收到offer后，设置为远程描述
     await remotePeerConnection.setRemoteDescription(offer);
     const answer = await remotePeerConnection.createAnswer();
     await remotePeerConnection.setLocalDescription(answer);

     // 通过信令服务器交换answer SDP

     // 本地接收到answer后，设置为本地描述
     await localPeerConnection.setRemoteDescription(answer);
   }
   ```

9. 监听远程音视频流：

   设置远程`RTCPeerConnection`对象的`ontrack`事件处理程序来监听接收到的远程音视频流。

   ```javascript
   remotePeerConnection.ontrack = function (event) {
     // 处理接收到的远程音视频流
   };
   ```

10. 发送和接收音视频数据：

    当连接建立后，通过ICE候选项和SDP交换，可以进行音视频数据的发送和接收。具体操作可以参考WebRTC相应的API文档和示例代码。

Tip: 在实际使用 WebRTC 时，还需要考虑信令服务器的搭建和 ICE 候选项的传输，以支持连接的建立和维护。

---

### 相关链接

[参考: WebRTC_API - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)
