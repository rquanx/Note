using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace ServiceMe.Apps.API.Common.Tools
{
    public class FileHelper
    {

        /// <summary>
        /// 以不占用的方式复制文件内容到MemoryStream中
        /// </summary>
        /// <param name="path"></param>
        /// <param name="ms"></param>
        public static void ReadFile(string path,MemoryStream ms)
        {
            FileStream fs = File.Open(path, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
            fs.CopyTo(ms);
            fs.Dispose();
        }


        /// <summary>
        /// 向客户端输出文件流
        /// </summary>
        /// <param name="ms"></param>
        /// <param name="name"></param>
        /// <param name="type"></param>
        public static void FlushFile(MemoryStream ms, string name, string type)
        {
            var Context = HttpContext.Current;
            Context.Response.ClearContent();
            Context.Response.ClearHeaders();
            Context.Response.Buffer = true;
            Context.Response.ContentType = "application/octet-stream";
            Context.Response.AddHeader("Content-Disposition", string.Format("attachment; filename={0}." + type, HttpUtility.UrlEncode(name, System.Text.Encoding.UTF8)));
            Context.Response.AddHeader("Content-Length", ms.Length.ToString());
            Context.Response.AddHeader("Access-Control-Allow-Origin", "*");
            Context.Response.AddHeader("Access-Control-Allow-Headers", "*");
            Context.Response.AddHeader("Access-Control-Expose-Headers", "Content-Disposition");
            Context.Response.BinaryWrite(ms.ToArray());
            Context.Response.Flush();
            Context.Response.SuppressContent = true;
            Context.ApplicationInstance.CompleteRequest();
        }
    }
}