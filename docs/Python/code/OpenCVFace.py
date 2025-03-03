import cv2

"""
OpenCV(Open Source Computer Vision Library) 跨平台的计算机视觉数据库。
应用场景：
人脸识别，人机互动，机器人视觉，动作识别等。

观察 opencv-python 版本：
cv2.__version__

带有 GUI 支持的 OpenCV 版本：
`pip install opencv-contrib-python`



1. 建立 OpenCV 图像窗口 - `namedWindow()`
语法: `cv2.namedWindow(窗口名称 [, 窗口旗标参数])`
参数:
    - 窗口名称
    - 窗口旗标参数(flag):
        - cv2.WINDOW_NORMAL (0) - 用户可自行调整窗口大小；
        - cv2.WINDOW_AUTOSIZE (1) - 系统将依图像调整窗口大小，用户无法调整窗口大小，这是预设；
        - cv2.WINDOW_OPENGL (4096) - 将以 OpenGL 支持方式打开窗口；

2. 读取图像 - `imread()`
语法: `cv2.imread(图像文件 [, 图像旗标])`
参数: 
    - 图像文件 - OpenCV 支持大部分格式，例如：*.jpg、*.jpeg、*.png、*.tiff、*.bmp；
    - 图像旗标参数:
        - cv2.IMREAD_COLOR (1) - （默认）以彩色图像读取；
        - cv2.IMREAD_GRAYSCALE (0) - 以灰色图像读取；
        - cv2.IMREAD_UNCHANGED (-1) - 以彩色读取包含 alpha 值的图像；

3. 使用 OpenCV 窗口显示图像 - `imshow()`
语法: `cv2.imshow(窗口名称, 图像对象)`


4. 存储图像 - `imwrite()`
语法: `cv2.imwrite(文件路径, 图像对象)`

5. 时间等待 - `waitKey()`
语法: `cv2.waitKey(n)`
Tip: 运行时间等待，n 单位是毫秒，若是 n = 0，代表无限期等待.

6. 关闭 OpenCV 窗口
语法: 
    - `cv2.destroyWindow(窗口名称)` # 删除
    - `cv2.destroyAllWindows()`

"""

window_name = "Face"
cv2.namedWindow(window_name, cv2.WINDOW_NORMAL)

# 这里传入绝对路径，不是绝对路径会存在报错
absolute_file_path = (
    "/Users/HuaYing/Desktop/resources/Local/Py/script/handle/images/bg.png"
)
image = cv2.imread(absolute_file_path, cv2.IMREAD_COLOR)

cv2.imshow(window_name, image)  # mac intel 系统下图片不显示

save_image_path = (
    "/Users/HuaYing/Desktop/resources/Local/Py/script/handle/images/cv_bg.png"
)


pc_type = ".png"

if pc_type == ".png":
    # 对于PNG图片，压缩时可以设置PNG的压缩等级
    # PNG的压缩等级范围是0到9，9是最大压缩
    cv2.imwrite(save_image_path, image, [int(cv2.IMWRITE_PNG_COMPRESSION), 9])
elif pc_type == ".jpg":
    # 设置JPEG压缩质量，0表示最低质量，100表示最高质量
    quality = 90  # 可以尝试不同的值（90-100）
    cv2.imwrite(save_image_path, image, [int(cv2.IMWRITE_JPEG_QUALITY), quality])
else:
    cv2.imwrite(save_image_path, image)
