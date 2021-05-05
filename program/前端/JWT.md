通过'.'拼接的字符串,分别为header、playload、signature(签名)



header、playload均为对象序列化后进行base64转码得到

header: 一般存储token有效时间

playload: 一般记录用户信息

signature: 加密后的签名信息，后端根据header、playload及密钥进行加密的字符串，用于校验token附带信息是否有效真实（未被修改），一般前端不用处理